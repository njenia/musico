const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")

const configLoader = require("./utils/config-loader")
const envUtils = require("./utils/env-utils")
const songsRouter = require("./songs/routes")
const initAppServices = require("./app-services")
const { ApiRequestError } = require("./utils/error-types")

const app = express()

const appConfig = configLoader.loadConfig(envUtils.getCurrentEnvironment())

initAppServices(app, appConfig)

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "jade")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use("/static-songs", express.static(appConfig.songsDir))

app.use("/api/songs", songsRouter)

app.use((req, res) => {
  res.status(404)
  res.render("error", { message: "Not Found" })
})

app.use((err, req, res, next) => {
  console.error(err)
  if (err instanceof ApiRequestError) {
    res.render("error", { message: err })
  } else {
    res.status(err.status || 500)
    res.render("error", {
      message:
        "We're sorry, something went wrong. Our best engineers are looking into this :)"
    })
  }
})

module.exports = app
