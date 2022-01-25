const { BeforeAll, Before, AfterAll, After } = require('cucumber')
const { chromium } = require('playwright');
const process = require('process');
const fs = require('fs')
var path = require('path');


//BSTACK
let bStack = process.argv.BSTACK;
console.log("BSTACK IS " + process.argv.BSTACK);
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
    'browserstack.username': 'YOUR_USERNAME',
    'browserstack.accessKey': 'YOUR_ACCESSKEY',
    'client.playwrightVersion': clientPlaywrightVersion  // Playwright version being used on your local project needs to be passed in this capability for BrowserStack to be able to map request and responses correctly
};


// Create a global browser for the test session.
BeforeAll(async () => {
    if (true) {
        global.browser = await chromium.connect({
            wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`,
        });
    }
    else {

        global.browser = await chromium.launch(options);
    }
});

AfterAll(async () => {
    await global.browser.close();
});

// Create a fresh browser context for each test.
Before(async (scenario) => {
    global.context = await global.browser.newContext({
        recordVideo: {
            dir: 'videos/' + scenario.pickle.name,
        }
    });
    global.page = await global.context.newPage();
});

After(async () => {
    await global.page.close();
    //global.context.close();
});
