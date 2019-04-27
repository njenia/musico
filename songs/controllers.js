const pageNotValidError = {
  status: 400,
  body: "page parameter must be a non negative integer"
}

const all = async ({
  appServices: { songQueries },
  queryParams: { page },
  parsedPage = parseInt(page || 0)
}) =>
  isNaN(parsedPage) || parsedPage < 0
    ? pageNotValidError
    : {
        body: (await songQueries.allPaged(parsedPage)).map(adaptedSong)
      }

const adaptedSong = ({
  _id,
  title,
  artist,
  songFilename
}) => ({
  id: _id,
  title,
  artist,
  songFilename
})

module.exports = {
  all
}
