class ApiRequestError extends Error {
  constructor(message) {
    super(message)
    this.name = 'Api request error'
  }
}

module.exports = {
  ApiRequestError
}