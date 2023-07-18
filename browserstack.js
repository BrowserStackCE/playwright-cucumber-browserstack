const cp = require('child_process');
const clientPlaywrightVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];
const commonCapabilities = {
    "build": "BrowserStack Build",
    "project": "Browserstack Project",
    "browserstack.username": process.env.BROWSERSTACK_USERNAME || "USERNAME",
    "browserstack.accessKey": process.env.BROWSERSTACK_ACCESS_KEY || "ACCESS _KEY",
    'client.playwrightVersion': clientPlaywrightVersion
}
const devices = {
    "chrome-osx": {
        "browse": "chrome",
        "os": "osx",
        "os_version": "catalina"
    },
    "samsung": {
        "osVersion": "12.0",
        "deviceName": "Samsung Galaxy S22", // "Samsung Galaxy S22 Ultra", "Google Pixel 7 Pro", "OnePlus 9", etc.
        "browserName": "chrome",
        "realMobile": "true",
    }
}

/**
 * 
 * @param {keyof devices} device 
 */
module.exports.getDevice = function (device) {
    let _device = devices[device]
    if (!device) {
        throw new Error("Device not registered in browserstack.js config")
    }
    return Object.assign({}, commonCapabilities, _device)
}
module.exports.browserstack = true