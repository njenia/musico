const assert = require("assert")
const path = require("path")
const client = require("mongodb").MongoClient
const configLoader = require(path.join(__dirname, 'config', 'config-loader'))

let _db

function initDb(callback) {
  if (_db) {
    console.warn("Trying to init DB again!")
    return callback(null, _db)
  }
  const dbConfig = configLoader.loadConfig(process.env.NODE_ENV).db
  console.log(`connecting to ${dbConfig.connectionString}`)
  client.connect(dbConfig.connectionString, dbConfig.connectionOptions, (err, client) => {
    if (err) {
      return callback(err)
    }
    console.log(`db initialized - connected to: ${dbConfig.connectionString}`)
    _db = client.db(dbConfig.dbName)
    return callback(null, _db)
  })
}

function getDb() {
  assert.ok(_db, "db has not been initialized. Call init first.")
  return _db
}

module.exports = {
  getDb,
  initDb
}