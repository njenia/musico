# Musico
Musico is a very simple music player, some would say too simple, but simplicity is the ultimate sophistication. 

## Tech
This project is built on express.js and uses mongodb to store data.
It also uses redis for cache and pubsub. 

## How to use
Create a DB in mongodb. Call it `musico` (the name is actually configurable so you can choose otherwise). 

Put the songs you like in a folder on your computer. That folder's absolute path should go into the `songsDir` field in [`config/config.development.json`](https://github.com/njenia/musico/blob/master/config/config.development.json#L6).

Put the connection string to your mongodb in the config file, in the `connectionString` field. 

In the db, create a collection named `songs` and fill it with documents of this sort (according to the songs you have in your dir):
```
{ 
    title: [SONG TITLE],
    artist: [ARTIST'S NAME],
    songFilename: [THE FILENAME OF THE SONG IN YOUR FOLDER]
}
```

From the root of the `musico` project, install all dependencies by running:
```
npm install
```

Now to run the service (in development mode), execute:
```
NODE_ENV=development npm start
```
The service supports multiple envs so all you have to do is to create a configuration in [`config`](https://github.com/njenia/musico/tree/master/config) and set `NODE_ENV` to its name.

Now you have the service running! 🎉 🎊

In your browser, you can go to `http://localhost:3000/api/songs`. This gives you a representation of the songs in page 0 (pages are of size 5 and are [configurable](https://github.com/njenia/musico/blob/master/songs/queries.js#L3)). To see other pages just add `?page=[PAGE_NUM]`.

To download a song, copy its `songFilename` value and go to `http://localhost:3000/static-songs/[SONG_FILENAME]`
_____________

## Future Improvements
- _Better db connection handling_. Currently we are creating a connection to mongo once on app startup, in [`app-services.js`](https://github.com/njenia/musico/blob/master/app-services.js).
  Scaling this app will require smarter connection management, for example connection pooling.
- _query projections_. Currently we are querying the db without any projection. If the `song` document will grow querying without projection will affect performance, both overloading mongo and slower network time. This could be solved by letting the routes ask for specific projections.
- _[route provider](https://github.com/njenia/musico/blob/master/utils/route-provider.js) responsibility_. This class has [too many responsibilities](https://en.wikipedia.org/wiki/Single_responsibility_principle): it injects the dependencies for routes and also handles errors. This should be broken into two separate wrappers. In addition,  as this wrapper is relevant to all routes, it might be nicer to make it a middleware that's used only once and affects all routes (although your'e making it implicit which is not so great, so it's a question). 
- _paging implementation_. In [`queries.js`](https://github.com/njenia/musico/blob/master/songs/queries.js) We are using `skip()` and `limit()` to implement paging. This will become [a performance issue](https://docs.mongodb.com/manual/reference/method/cursor.skip/#using-range-queries) as the collection grows and it's recommended to use other methods. 
- _Error view_. The error views are very basic and could be CSSed into something much nicer.  
