const { db } = require('../index.js')

getAllGenres = (req,res,next) => {
  db.any("SELECT * FROM genres")
  .then(genres => {
    res.status(200).json({
      status: "success",
      genres: genres,
      message: "recieved all genres"
    })
  })
  .catch(err => {
    return next(err)
  })
}


createGenre = (req,res,next) => {
  db.one("INSERT INTO genres(genre_name) VALUES(${genre_name}) RETURNING genre_name",
  {
  genre_name: req.body.genre_name
  }
).then(genre => {
  res.status(200).json({
    status: "success",
    genre: genre,
    message: "added new genre"
    })
  })
.catch(err => {
  return next(err)
  })
}




module.exports = {
  getAllGenres, createGenre
}
