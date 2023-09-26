const { Given, When, Then } = require("@cucumber/cucumber")
const { SamplePage } = require("../page-objects/sample-page")

const samplePage = new SamplePage()

Given("I open bstackdemo homepage", async function () {
  await samplePage.launchPage()
})

When("I add to cart and checkout", async function () {
  await samplePage.addToCart()
})

Then("I Attempt to login", async function () {
  await samplePage.loginAttempt()
})