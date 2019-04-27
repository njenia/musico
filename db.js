const mongoClient = require('mongodb').MongoClient

const getDb = async appConfig => {
  const dbConfig = appConfig.db
  console.log(`connecting to ${dbConfig.connectionString}`)
  const client = await mongoClient.connect(dbConfig.connectionString, dbConfig.connectionOptions)

  console.log(`db initialized - connected to: ${dbConfig.connectionString}`)

  return client.db(dbConfig.dbName)
}

module.exports = getDb
