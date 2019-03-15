const { db } = require('../index.js')


getAllSongs = (req,res,next) => {
  db.any("SELECT * FROM songs")
  .then(songs => {
    res.status(200).json({
      status: "success",
      songs: songs,
      message: "recieved all songs"
    })
  })
  .catch(err => {
    return next(err)
  })
}


getSongsBySpecificGenre = (req,res,next) => {
  let genreId = parseInt(req.params.id)
  db.any("SELECT * FROM songs JOIN genres ON songs.genre_id=genres.id WHERE genres.id=$1", [genreId])
  .then(songs => {
    res.status(200).json({
      status: "success",
      songs: songs,
      message: "recieved songs by specific genre"
    })
  })
  .catch(err => {
    return next(err)
  })
}

allSongsPostedBySpecificUser = (req,res,next) => {
  let userId = parseInt(req.params.id)
  db.any("SELECT * FROM songs JOIN genres ON songs.genre_id=genres.id WHERE songs.user_id=$1", [userId])
  .then(songs => {
    res.status(200).json({
      status: "success",
      songs: songs,
      message: "got all songs posted by specific user"
    })
  })
  .catch(err => {
    return next(err)
  })
}


getOneSong = (req,res,next) => {
  let songId = parseInt(req.params.id)
  db.one("SELECT * FROM songs JOIN genres ON songs.genre_id=genres.id WHERE songs.id=$1", [songId])
  .then(song => {
    res.status(200).json({
      status: "success",
      song: song,
      message: "recieved single song"
    })
  })
  .catch(err => {
    return next(err)
  })
}

createNewSong = (req,res,next) => {
  db.one("INSERT INTO songs(title, img_url, user_id, genre_id) VALUES(${title}, ${img_url}, ${user_id}, ${genre_id}) RETURNING title",
  {
    title: req.body.title,
    img_url: req.body.img_url,
    user_id: parseInt(req.body.user_id),
    genre_id: parseInt(req.body.genre_id)
  }
).then(song => {
  res.status(200).json({
    status: "success",
    song: song,
    message: "created new Song"
    })
  })
.catch(err => {
  return next(err)
  })
}

deleteSingleSong = (req,res,next) => {
  let songId = parseInt(req.params.id)
  db.result("DELETE FROM songs WHERE id=$1", songId)
  .then(result => {
    res.status(200).json({
      status: "success",
      message: "removed a song",
      result: result
    })
  })
  .catch(err => {
    return next(err)
  })
}


module.exports = {
  getAllSongs, getSongsBySpecificGenre, allSongsPostedBySpecificUser, getOneSong, createNewSong, deleteSingleSong
}
