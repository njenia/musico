const path = require("path")

const envUtils = require(path.join(__dirname, '../envUtils'))

const loadConfig = env => require(path.join(__dirname, `config.${envUtils.getCurrentEnvironment()}.json`));

module.exports = {
  loadConfig
}