class SamplePage {
    async launchPage() {
      await page.goto("https://www.wikipedia.org/")
    }
    
    async search() {
      await page.fill("#searchInput", "BrowserStack")
      await page.click('//*[@id="search-form"]/fieldset/button')
    }
  }
  
  module.exports = { SamplePage }
  