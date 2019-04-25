const Environments = Object.freeze({
  DEVELOPMENT: Symbol("development")
})

const getCurrentEnvironment = () => process.env.NODE_ENV || Environments.DEVELOPMENT

module.exports = {
  getCurrentEnvironment,
  Environments
}