const { Given, When, Then } = require("@cucumber/cucumber")
const { SamplePage } = require("../page-objects/sample-page")

const samplePage = new SamplePage()

Given("I open wikipedia homepage", async function () {
  await samplePage.launchPage()
})

When("Enter text and search", async function () {
  await samplePage.search()
})