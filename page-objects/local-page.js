class LocalPage {
  async launchPage() {
    await page.goto("http://localhost:45454/")
    await page.waitForTimeout(5000);
  }
}

module.exports = { LocalPage }
