const { db } = require('../index.js')


getAllFavorites = (req,res,next) => {
  db.any("SELECT songs.title, songs.img_url, ARRAY_AGG(favorites.user_id) AS usersLikes, songs.user_id FROM songs JOIN favorites ON songs.id=favorites.song_id GROUP BY songs.title, songs.img_url, favorites.song_id, songs.user_id")
  .then(favorites => {
    res.status(200).json({
      status: "success",
      favorites: favorites,
      message: "recieved all favorites"
    })
  })
  .catch(err => {
    return next(err)
  })
}


getAllFavoritesForSpecificSong = (req,res,next) => {
  let songId = parseInt(req.params.id)
  db.one("SELECT songs.title, songs.img_url, ARRAY_AGG(favorites.user_id) AS usersLikes, songs.user_id FROM songs JOIN favorites ON songs.id=favorites.song_id WHERE songs.id=$1 GROUP BY songs.title, songs.img_url, favorites.song_id, songs.user_id", [songId])
  .then(favorite => {
    res.status(200).json({
      status: "success",
      favorite: favorite,
      message: "recieved all favorites for a specific song"
    })
  })
  .catch(err => {
    return next(err)
  })
}


createNewFavorite = (req,res,next) => {
  db.one("INSERT INTO favorites(user_id,song_id) VALUES(${user_id}, ${song_id}) RETURNING song_id",
{
  user_id: parseInt(req.body.user_id),
  song_id: parseInt(req.body.song_id)
}
).then(favorite => {
  res.status(200).json({
    status: "success",
    favorite:favorite,
    message: "created new favorite"
  })
})
.catch(err => {
  return next(err)
})
}


deleteSingleFavorite = (req,res,next) => {
  let favoriteId = parseInt(req.params.id)
  db.result("DELETE FROM favorites WHERE id=$1", favoriteId)
  .then(result => {
    res.status(200).json({
      status: "success",
      message: "deleted a favorite",
      result: result
    })
  })
  .catch(err => {
    return next(err)
  })
}

module.exports = {
  getAllFavorites, getAllFavoritesForSpecificSong, createNewFavorite, deleteSingleFavorite
}
