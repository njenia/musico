const path = require("path")

const loadConfig = env =>
  require(path.join(
    __dirname,
    "..",
    "config",
    `config.${env}.json`
  ))

module.exports = {
  loadConfig
}
