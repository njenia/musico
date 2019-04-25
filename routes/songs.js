const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  const db = res.app.settings.db
  res.json(await db.collection('songs').find().toArray())
})

module.exports = router
