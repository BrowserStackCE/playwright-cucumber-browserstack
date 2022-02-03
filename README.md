# playwright-cucumber-browserstack

This repository demonstrates how you can run a playwright-cucumber based tests on BrowserStack cloud.

1. Configuring the test

    - Clone the repo 
    ``` 
    npm install
    ```
    - Add your BrowserStack username and access key to the [`config file`](config.json)
    - In [`config file`](config.json) you can choose if you want to run tests locally or on Browserstack cloud by setting the value of "run_on_BS_cloud" to either         true or false 
    - Run the test
     ```
     npm run test
     ```
    
