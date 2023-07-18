const { Given, When, Then } = require('@cucumber/cucumber')
const expect = require('chai').expect
var { setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(60 * 1000);


Given('I type query as BrowserStack', async () => {
    await page.goto('https://duckduckgo.com/');
    const element = await page.$('#searchbox_input');
    await element.click();
    await element.type('BrowserStack');

});

Then('I submit', async () => {
    const element1 = await page.$('#searchbox_input');
    await element1.press('Enter');
});

Then('I should see title BrowserStack', async () => {
    const title = await page.title('');
    console.log(title);
    try {
        expect(title).to.equal("BrowserStack at DuckDuckGo");
        // following line of code is responsible for marking the status of the test on BrowserStack as 'passed'. You can use this code in your after hook after each test
        await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify({ action: 'setSessionStatus', arguments: { status: 'passed', reason: 'Title matched' } })}`);
    } catch {
        await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify({ action: 'setSessionStatus', arguments: { status: 'failed', reason: 'Title did not match' } })}`);
    }
});