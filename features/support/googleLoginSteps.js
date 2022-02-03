const { Given, When, Then } = require('cucumber')
const expect = require('chai').expect
var { setDefaultTimeout } = require('cucumber');
setDefaultTimeout(60 * 1000);


Given('I type query as BrowserStack', async () => {
    await page.goto('https://www.google.co.in');
    const element = await page.$('[aria-label="Search"]');
    await element.click();
    await element.type('BrowserStack');

});

Given('I am on facebook login page', async () => {
    await page.goto('https://www.facebook.com/login/');

});


When('I enter wrong credentials and login', async () => {
    await page.fill('#email', 'some.wrong@gmal.com');
    await page.fill('#pass', 'some-wrong-password');


})


Then('I submit', async () => {
    const element1 = await page.$('[aria-label="Search"]');
    await element1.press('Enter');
});

Then('I should see title BrowserStack', async () => {
    const title = await page.title('');
    console.log(title);
    try {
        expect(title).to.equal("BrowserStack - Google Search", 'Expected page title is incorrect!');


        // following line of code is responsible for marking the status of the test on BrowserStack as 'passed'. You can use this code in your after hook after each test
        await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify({ action: 'setSessionStatus', arguments: { status: 'passed', reason: 'Title matched' } })}`);


    } catch {
        await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify({ action: 'setSessionStatus', arguments: { status: 'failed', reason: 'Title did not match' } })}`);

    }
});