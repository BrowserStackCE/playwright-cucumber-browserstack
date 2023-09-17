const { Given, When, Then } = require("@cucumber/cucumber")
const { LocalPage } = require("../page-objects/local-page")

const localPage = new LocalPage()

Given("I open BrowserStackLocal Dashboard", async function () {
  await localPage.launchPage()
})