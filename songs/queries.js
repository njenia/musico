const SONGS_COLLECTION_NAME = 'songs'

const PAGE_SIZE = 5

const songQueries = db => ({
  allPaged: page =>
    db
      .collection(SONGS_COLLECTION_NAME)
      .find()
      .skip(page * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .toArray()
})

module.exports = songQueries