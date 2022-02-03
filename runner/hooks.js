const { BeforeAll, Before, AfterAll, After } = require('cucumber')
const { chromium } = require('playwright');
//const process = require('process');
const fs = require('fs')
var path = require('path');
require('dotenv').config();
const CONFIG = require('../config.json')

//BSTACK
let bStack = CONFIG.run_on_BS_cloud
console.log("BSTACK IS " + bStack);
const options = {
    headless: false,
    slowMo: 75
};

const cp = require('child_process');
const clientPlaywrightVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];

const caps = {
    'browser': CONFIG.browser,  // allowed browsers are `chrome`, `edge`, `playwright-chromium`, `playwright-firefox` and `playwright-webkit`
    'os': CONFIG.os,
    'os_version': CONFIG.os_version,
    'name': CONFIG.name,
    'build': CONFIG.build,
    'browserstack.username': CONFIG.user,
    'browserstack.accessKey': CONFIG.accessKey,
    'client.playwrightVersion': clientPlaywrightVersion  // Playwright version being used on your local project needs to be passed in this capability for BrowserStack to be able to map request and responses correctly
};


// Create a global browser for the test session.
BeforeAll(async () => {
    if (bStack) {
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
