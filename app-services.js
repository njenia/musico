const getDb = require("./db")

const songQueries = require('./songs/queries')

const initAppServices = async (app, appConfig) => { app.locals.songQueries = songQueries(await getDb(appConfig)) }

module.exports = initAppServices
