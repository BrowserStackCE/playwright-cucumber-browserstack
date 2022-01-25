const { BeforeAll, Before, AfterAll, After } = require('cucumber')
const { chromium } = require('playwright');
//const process = require('process');
const fs = require('fs')
var path = require('path');
require('dotenv').config();

//BSTACK
let bStack = process.env.BSTACK
console.log("BSTACK IS " + bStack);
const options = {
    headless: false,
    slowMo: 75
};

const cp = require('child_process');
const clientPlaywrightVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];

const caps = {
    'browser': 'chrome',  // allowed browsers are `chrome`, `edge`, `playwright-chromium`, `playwright-firefox` and `playwright-webkit`
    'os': 'osx',
    'os_version': 'catalina',
    'name': 'My first playwright test',
    'build': 'playwright-build-1',
    'browserstack.username': process.env.BROWSERSTACK_USERNAME,
    'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY,
    'client.playwrightVersion': clientPlaywrightVersion  // Playwright version being used on your local project needs to be passed in this capability for BrowserStack to be able to map request and responses correctly
};


// Create a global browser for the test session.
BeforeAll(async () => {
    if (bStack == "true") {
        console.log("RUNNING TEST ON BROWSERSTACK");
        global.browser = await chromium.connect({
            wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`,
        });
    }
    else {
        console.log("RUNNING THE TEST LOCALLY");
        global.browser = await chromium.launch(options);
    }
});

AfterAll(async () => {
    await global.browser.close();
});

// Create a fresh browser context for each test.
Before(async (scenario) => {
    global.context = await global.browser.newContext();
    global.page = await global.context.newPage();
});

After(async () => {
    await global.page.close();
    //global.context.close();
});
