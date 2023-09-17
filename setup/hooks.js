const playwright = require("playwright")
const { chromium, _android } = require("playwright")
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
  if (caps.realMobile) {
    global.device = await _android.connect(
      `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(
        JSON.stringify(caps)
      )}`
    )
    await global.device.shell("am force-stop com.android.chrome")
  } else {
    global.browser = await chromium.connect({
      wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(
        JSON.stringify(caps)
      )}`,
    })
  }
})

AfterAll(async () => {
  if (caps.realMobile == "true") {
    await global.device.close()
  } else {
    await global.browser.close()
  }
})

Before(async () => {
  global.context =
    caps.realMobile == "true"
      ? await global.device.launchBrowser()
      : await global.browser.newContext()
  global.page = await global.context.newPage()
})

After(async () => {
  if (caps.realMobile == "true") {
    await global.context.close()
  } else {
    await global.page.close()
  }
})
