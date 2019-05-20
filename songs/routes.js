const express = require("express")
const router = express.Router()

const { all, one } = require('./controllers')

const routeProvider = require('../utils/route-provider')

router.get(
  "/",
  routeProvider(
    all
  )
)

router.get(
  "/:id",
  routeProvider(
    one
  )
)

module.exports = router
