const playwright = require("playwright")
const { chromium } = require("playwright")
const {
  Before,
  After,
  BeforeAll,
  AfterAll,
  setDefaultTimeout,
} = require("@cucumber/cucumber")
const config = require("../browserstack.config.js")

setDefaultTimeout(60 * 1000)

//Getting browser configuration from browserstack.config.js based on the TASK_ID provided (default index being 0)
let caps = config[process.env.TASK_ID || 0]
caps["browserstack.username"] = process.env.BROWSERSTACK_USERNAME || "user"
caps["browserstack.accessKey"] = process.env.BROWSERSTACK_ACCESS_KEY || "key"
caps["browserstack.local"] = process.env.BROWSERSTACK_LOCAL || "false"

BeforeAll(async () => {
  global.browser = await chromium.connect({
    wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(
      JSON.stringify(caps)
    )}`,
  })
})

AfterAll(async () => {
  console.log("Close Browser")
  await global.browser.close()
})

Before(async () => {
  console.log("Create new context page")
  global.context = await global.browser.newContext()
  global.page = await global.context.newPage()
})

After(async () => {
  console.log("Close context and page")
  await global.context.close()
  await global.page.close()
})
