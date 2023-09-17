let config = [
  {
    browser: "chrome",
    os: "windows",
    os_version: "10",
    name: "Chrome Session",
    build: "Playwright Cucumber Build",
  },
  {
    browser: "playwright-firefox",
    os: "windows",
    os_version: "10",
    name: "Firefox Session",
    build: "Playwright Cucumber Build",
  },
  {
    browser: "edge",
    os: "windows",
    os_version: "10",
    name: "Edge Session",
    build: "Playwright Cucumber Build",
  },
  {
    osVersion: "12.0",
    deviceName: "Samsung Galaxy S22",
    browserName: "chrome",
    realMobile: "true",
    name: "Android Session",
    build: "Playwright Cucumber Build",
  },
]

module.exports = config
