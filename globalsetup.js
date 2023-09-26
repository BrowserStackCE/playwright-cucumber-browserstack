function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

let BS_LOCAL_ARGS = {
  key: process.env.BROWSERSTACK_ACCESS_KEY || "key",
}

async function globalSetup(bsLocal) {
  console.log("Starting BrowserStackLocal ...")

  // Starts the Local instance with the required arguments
  let localResponseReceived = false
  await bsLocal.start(BS_LOCAL_ARGS, (err) => {
    if (err) {
      console.error(
        `Error starting BrowserStackLocal, ${err}`
      )
    } else {
      console.log("BrowserStackLocal Started")
    }
    localResponseReceived = true
  })
  while (!localResponseReceived) {
    await sleep(500)
  }
}

module.exports = globalSetup
