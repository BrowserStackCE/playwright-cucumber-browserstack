const common = `
    --require setup/assertions.js
    --require setup/hooks.js
    --require step-definitions/**/*.step.js
    --require step-definitions/**/*.js
    --require cucumber.js
`
module.exports = {
  default: `${common} features/**/sample.feature`,
  browserstack: `${common} features/**/sample.feature`,
  browserstackLocal: `${common} features/**/local.feature`,
}
