var express = require('express');
var router = express.Router();
const { getAllGenres, createGenre } = require('../db/queries/genreQueries.js')


router.get('/', getAllGenres);
router.post('/', createGenre);


module.exports = router
