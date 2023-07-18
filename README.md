# playwright-cucumber-browserstack

This repository demonstrates how you can run a playwright-cucumber based tests on BrowserStack cloud.

## Configuring the test

- Clone the repo 
``` 
npm install
```
- Add your BrowserStack username and access key to the [`browserstack.js`](browserstack.js) or add BROWSERSTACK_USERNAME & BROWSERSTACK_ACCESS_KEY environment variables
- In [`browserstack.js`](browserstack.js) you can choose if you want to run tests locally or on Browserstack cloud by setting the value of "module.exports.browserstack" to either true or false 
- Add devices in [`browserstack.js`](browserstack.js) key being an identifier and value being capabilities related to the device you want to run the tests on.
- DEVICE environment variable can be used to choose device from above list of devices at runtime instead of hardcoding a value
- Run the test as per scripts in [`package.json`](package.json)
    ```
    npm run test:samsung
    ```
    
