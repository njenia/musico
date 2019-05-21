const url = require('url')
const WebSocket = require('ws')
const redis = require('redis')
const _ = require("lodash")

const wss = new WebSocket.Server({port: 8080})

wss.on('connection', (ws, req) => {
  // Creating redis connections per socket. Not very good for scalability (but good for performance).
  // To make this scalable we would need to use a connection pool.
  const pub = redis.createClient()
  const sub = redis.createClient()
  const cache = redis.createClient()
  const songId = url.parse(req.url, true).query.songId

  const saveAndPublish = updatedSongCounter => {
    cache.set(songId, updatedSongCounter, () => {})
    pub.publish(songId, updatedSongCounter)
  }
  // See comment in musico-frontend/.../song-player/view.js
  // The communication between client and server is using connection open and close, and
  // the socket lives only as long as the user is in the song-player page. A better option
  // is to keep the socket alive through the whole session and when the user goes in and out
  // of the song player page - send a message on the socket.
  ws.on('close', function close() {
    cache.get(songId, (error, songCounter) => {
      if (error) {
        throw error
      }
      const updatedSongCounter = parseInt(songCounter) - 1
      saveAndPublish(updatedSongCounter)
      sub.unsubscribe()
      sub.quit()
      pub.quit()
    })
  })
  sub.on("subscribe", function () {
    cache.get(songId, (error, songCounter) => {
      if (error) {
        throw error
      }
      const updatedSongCounter = (_.isNil(songCounter) || _.isNaN(songCounter) ? 1 : parseInt(songCounter) + 1)
      saveAndPublish(updatedSongCounter)
    })
  })

  sub.on("message", function (channel, songCounter) {
    ws.send(songCounter)
  })

  sub.subscribe(songId)
})