const ObjectID = require('mongodb').ObjectID;

const SONGS_COLLECTION_NAME = 'songs'


const songQueries = db => ({
  allPaged: (page, pageSize) =>
    db
      .collection(SONGS_COLLECTION_NAME)
      .find()
      .skip(page * pageSize)
      .limit(pageSize)
      .toArray(),
  one: id =>
    db
      .collection(SONGS_COLLECTION_NAME)
      .findOne({_id: ObjectID(id)}),
  count: () =>
    db
      .collection(SONGS_COLLECTION_NAME)
      .count()
})

module.exports = songQueries