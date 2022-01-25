
const common = `
  --require runner/assertions.js
  --require runner/hooks.js 
  --require features/support/googleLoginSteps.js
  `;

module.exports = {
  // default: `${common} features/**/*.feature`
  default: `${common} features/google.feature`
};