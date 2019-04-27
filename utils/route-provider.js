const { ApiRequestError } = require('./error-types')

const routeProvider = routeHandlerFn => async (req, res, next) => {
  const routeHandlerParams = {
    appServices: {
      songQueries: res.app.locals.songQueries
    },
    queryParams: req.query
  }
  try{
    const {status = 200, body = {}} = await routeHandlerFn(routeHandlerParams)
    if (status === 400) {
      throw new ApiRequestError(body)
    }
    res.status(status).json(body)
  } catch(error) {
    next(error)
  }
}


module.exports = routeProvider