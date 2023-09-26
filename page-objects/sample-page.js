class SamplePage {
    async launchPage() {
      await page.goto("https://bstackdemo.com/")
    }
    
    async addToCart() {
      await page.click('//*[@id="1"]/div[4]')
      await page.click('//*[@id="__next"]/div/div/div[2]/div[2]/div[3]/div[3]')
    }

    async loginAttempt() {
      await page.click('//*[@id="login-btn"]')
    }
  }
  
  module.exports = { SamplePage }
  