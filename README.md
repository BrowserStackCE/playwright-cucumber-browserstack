# Playwright Cucumber Setup with BrowserStack

This repository demonstrates how to set up end-to-end testing for web applications using Playwright and Cucumber, with BrowserStack for cross-browser and cross-device testing.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your system.
- BrowserStack account (username and access key).

## Installation

```bash
npm install
```

## Set BrowserStack Credentials

Set or export your BrowserStack credentials:

```bash
export BROWSERSTACK_USERNAME=your_username
export BROWSERSTACK_ACCESS_KEY=your_access_key
```

## Usage


### Run a single test
```bash
npm run single
```

### Run tests in parallel
```bash
npm run parallel
```


### Run a single test with local testing
```bash
npm run local-single
```

### Run tests in parallel with local testing
```bash
npm run local-parallel
```

# Project Structure

- `features/`: Directory containing Cucumber feature files.
- `step_definitions/`: Directory containing step definitions for Cucumber.
- `setup/hooks.js`: File to setup the browser object and initiate connection with BrowserStack.
- `browserstack.config.js`: List of Browsers for cross-browser testing.
- `single.js`: Script to run test command for a single test.
- `parallel.js`: Script to run multiple test commands for running tests in parallel.
- `globalsetup.js` and `globalteardown.js`: Files to start and stop BrowserStackLocal tunnel respectively