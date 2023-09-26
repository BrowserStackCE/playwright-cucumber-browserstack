let testCount = 0; //variable to keep track of all tests getting completed

async function globalTeardown(bsLocal) {
  return new Promise((resolve) => {
    const checkInterval = setInterval(() => {
      if (testCount === 0) {
        clearInterval(checkInterval);
        bsLocal.stop(() => {
          console.log("Stopped BrowserStackLocal");
          resolve(); // Resolve the promise when the stop operation is complete
        });
      }
    }, 1000); // Check every second
  });
}

function decreaseTestCount() {
  testCount--;
}

function increaseTestCount() {
  testCount++;
}

module.exports = {
  globalTeardown,
  decreaseTestCount,
  increaseTestCount,
};
