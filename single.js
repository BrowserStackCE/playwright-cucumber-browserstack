#!/usr/bin/env node
let child_process = require("child_process")
let globalSetup = require("./globalsetup")
const {
  globalTeardown,
  decreaseTestCount,
  increaseTestCount,
} = require("./globalteardown")

const BrowserStackLocal = require("browserstack-local")

let bsLocal = new BrowserStackLocal.Local()

process.argv[0] = "npx"
process.argv[1] = "cucumber-js"

async function exec() {
  if (process.env.BROWSERSTACK_LOCAL == "true") {
    await globalSetup(bsLocal)
  }

  let env = await Object.create(process.env)
  env.TASK_ID = 0
  let p = await child_process.spawn("/usr/bin/env", process.argv, { env: env })

  increaseTestCount()
  p.on("close", () => {
    decreaseTestCount()
  })
  p.stdout.pipe(process.stdout)

  if (process.env.BROWSERSTACK_LOCAL == "true") {
    await globalTeardown(bsLocal)
  }
}

exec()
