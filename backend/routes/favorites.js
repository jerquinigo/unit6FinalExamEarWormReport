var express = require('express');
var router = express.Router();
const { getAllFavorites, getAllFavoritesForSpecificSong, createNewFavorite, deleteSingleFavorite } = require('../db/queries/favoritesQueries.js')


router.get('/', getAllFavorites);
router.get('/:id', getAllFavoritesForSpecificSong);
router.post('/', createNewFavorite);
router.delete('/:id', deleteSingleFavorite);


module.exports = router
