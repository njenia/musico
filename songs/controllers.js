const { SONGS_STATIC_URL } = require("../utils/constants")

const pageNotValidError = {
  status: 400,
  body: "page parameter must be a non negative integer"
}

const PAGE_SIZE = 5

const all = async ({
  appServices: { songQueries },
  queryParams: { page },
  parsedPage = parseInt(page || 0)
}) => {
  const songsCount = await songQueries.count()
  const songs = (await songQueries.allPaged(parsedPage, PAGE_SIZE)).map(adaptedSong)
  return isNaN(parsedPage) || parsedPage < 0
    ? pageNotValidError
    : {
        body: {
          count: songsCount,
          maxPage: Math.ceil(songsCount / PAGE_SIZE) - 1,
          songs: songs
        }
      }
}

const one = async ({
  appServices: { songQueries },
  params: { id }
}) => ({
  body: adaptedSong(await songQueries.one(id))
})

const adaptedSong = ({
  _id,
  title,
  artist,
  songFilename
}) => ({
  id: _id,
  title,
  artist,
  url: `${SONGS_STATIC_URL}/${songFilename}`
})

module.exports = {
  all, one
}
