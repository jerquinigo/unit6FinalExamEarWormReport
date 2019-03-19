const { db } = require('../index.js')

getAllComments = (req,res,next) => {
  db.any("SELECT songs.id, users.id AS users_id, comments.comment_body AS COMMENTS, users.username, songs.title, songs.img_url FROM comments JOIN users ON comments.user_id=users.id JOIN songs ON comments.song_id=songs.id ORDER BY songs.id ASC")
  .then(comments => {
    res.status(200).json({
      status: "success",
      comments: comments,
      message: "recieved all comments"
    })
  })
  .catch(err => {
    return next(err)
  })
}

getAllCommentsForSpecificSong = (req,res,next) => {
  let songId = parseInt(req.params.id)
  db.any("SELECT comments.comment_body AS COMMENTS, users.username, songs.title, songs.img_url FROM comments JOIN users ON comments.user_id=users.id JOIN songs ON comments.song_id=songs.id  WHERE songs.id=$1 ORDER BY users.username ASC", [songId])
  .then(comment => {
    res.status(200).json({
      status:"success",
      comment: comment,
      message: "recieved all comments for one song"
    })
  })
  .catch(err => {
    return next(err)
  })
}

createNewComment = (req,res,next) => {
  db.one("INSERT INTO comments(comment_body, user_id, song_id) VALUES(${comment_body}, ${user_id}, ${song_id}) RETURNING comment_body",
  {
    comment_body: req.body.comment_body,
    user_id: parseInt(req.body.user_id),
    song_id: parseInt(req.body.song_id)

  }
).then(comment => {
  res.status(200).json({
    status: "success",
    comment: comment,
    message: "created new comment"
  })
})
.catch(err => {
  return next(err)
})
}


deleteComment = (req,res,next) => {
  commentId = parseInt(req.params.id)
  db.result("DELETE FROM comments WHERE id=$1",commentId)
  .then(result => {
    res.status(200).json({
      status: "success",
      message: "deleted a comment",
      result: result
    })
  })
  .catch(err => {
    return next(err)
  })
}


module.exports = {
  getAllComments, getAllCommentsForSpecificSong, createNewComment, deleteComment
}
