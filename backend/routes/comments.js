var express = require('express');
var router = express.Router();
const { getAllComments, getAllCommentsForSpecificSong, createNewComment, deleteComment } = require('../db/queries/commentsQueries.js')


router.get('/',getAllComments);
router.get('/:id', getAllCommentsForSpecificSong);
router.post('/', createNewComment);
router.delete('/:id', deleteComment);


module.exports = router;
