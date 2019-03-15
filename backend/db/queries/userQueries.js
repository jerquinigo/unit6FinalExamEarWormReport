const { db } = require('../index.js')


getAllUsers = (req,res,next) => {
  db.any("SELECT * FROM users")
  .then(users => {
    res.status(200).json({
      status:"success",
      users: users,
      message: "recieved all users"
    })
  })
  .catch(err => {
    return next(err)
  })
}

getSingleUser = (req,res,next) => {
  let userId = parseInt(req.params.id)
  db.one("SELECT * FROM users where id=$1", [userId])
  .then(user => {
    res.status(200).json({
      status:"success",
      user: user,
      message: "recieved single user"
    })
  })
  .catch(err => {
    return next(err)
  })
}

createUser = (req,res,next) => {
  db.one("INSERT INTO users(username) VALUES(${username}) RETURNING username",
  {
    username: req.body.username
  }
).then(user => {
  res.status(200).json({
  status: "success",
  user: user,
  message: "created a new user"
    })
  })
  .catch(err => {
    return next(err)
  })
}

deleteUser = (req,res,next) => {
  let userId = parseInt(req.params.id)
  db.result("DELETE FROM users WHERE id=$1", userId)
  .then(result => {
    res.status(200).json({
      status: "success",
      message: "removed a user",
      result: result
    })
  })
  .catch(err => {
    return next(err)
  })
}

module.exports = {
  getAllUsers, getSingleUser, createUser, deleteUser
}
