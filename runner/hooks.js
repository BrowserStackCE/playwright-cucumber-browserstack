const { BeforeAll, Before, AfterAll, After } = require('@cucumber/cucumber')
const { chromium, _android } = require('playwright');
require('dotenv').config();
const { getDevice,browserstack } = require('../browserstack')

const device = process.env.DEVICE
const caps = getDevice(device)


const options = {
    headless: false,
    slowMo: 75
};



// Create a global browser for the test session.
BeforeAll(async () => {
    if (browserstack) {
        console.log("RUNNING TEST ON BROWSERSTACK");
        if (caps.realMobile == "true") {
            global.device = await _android.connect(`wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`)
            await global.device.shell('am force-stop com.android.chrome');
        } else {
            global.browser = await chromium.connect({
                wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`,
            });
        }
    }
    else {
        console.log("RUNNING THE TEST LOCALLY");
        global.browser = await chromium.launch(options);
    }
});

AfterAll(async () => {
    if (caps.realMobile == "true") {
        await global.device.close();
    }else{
        await global.browser.close();
    }
    
});

// Create a fresh browser context for each test.
Before(async (scenario) => {
    global.context = caps.realMobile == "true" ? await global.device.launchBrowser() : await global.browser.newContext();
    global.page = await global.context.newPage();
});

After(async () => {
    if (caps.realMobile == "true") {
        await global.context.close()
    } else {
        await global.page.close();
    }
});
