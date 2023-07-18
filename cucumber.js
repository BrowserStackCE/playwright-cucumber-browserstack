const options = [
  '--require runner/hooks.js ',
  '--require features/support/*.js'
].join(' ')
module.exports = {
  // default: `${common} features/**/*.feature`
  browserstack: `${options} features/**/*.feature`
};