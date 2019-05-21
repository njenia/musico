const express = require("express")
const router = express.Router()

const { all, one, stats } = require('./controllers')

const routeProvider = require('../utils/route-provider')

router.get(
  "/stats",
  routeProvider(
    stats
  )
)

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
