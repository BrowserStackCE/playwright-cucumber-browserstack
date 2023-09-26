#!/usr/bin/env node
let child_process = require("child_process")
let config = require("./browserstack.config.js")
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
process.argv[2] = "-p"
process.argv[3] =
  process.env.BROWSERSTACK_LOCAL == "true"
    ? "browserstackLocal"
    : "browserstack"

async function exec() {
  //Start BrowserStack Local if BROWSERSTACK_LOCAL is set to true
  if (process.env.BROWSERSTACK_LOCAL == "true") {
    await globalSetup(bsLocal)
  }

  //Promises array for test executions
  const testPromises = []

  for (let i in config) {
    let env = Object.create(process.env)
    env.TASK_ID = i.toString() //setting a task id indicating the configuration for test execution
    let p = child_process.spawn("/usr/bin/env", process.argv, { env: env }) // executing the test command

    increaseTestCount()
    p.on("close", () => {
      decreaseTestCount()
    })

    p.stdout.pipe(process.stdout)

    //storing the promises
    testPromises.push(
      new Promise((resolve, reject) => {
        p.on("close", (code) => {
          if (code === 0) {
            resolve()
          } else {
            reject(new Error(`Test process exited with code ${code}`))
          }
        })
      })
    )
  }

  await Promise.all(testPromises) // Wait for all tests to complete

  //Stopping BrowserStack Local
  if (process.env.BROWSERSTACK_LOCAL == "true") {
    await globalTeardown(bsLocal)
  }
}

exec()
