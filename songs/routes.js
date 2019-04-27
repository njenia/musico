const express = require("express")
const router = express.Router()

const { all } = require('./controllers')

const routeProvider = require('../utils/route-provider')


router.get(
  "/",
  routeProvider(
    all
  )
)

module.exports = router
