var express = require('express');
var router = express.Router();
const { getAllFavorites, getAllFavoritesForSingleUser, getAllFavoritesForSpecificSong, createNewFavorite, deleteSingleFavorite } = require('../db/queries/favoritesQueries.js')


router.get('/', getAllFavorites);
router.get('/:id', getAllFavoritesForSpecificSong);
router.get('/user/:id', getAllFavoritesForSingleUser);
router.post('/', createNewFavorite);
router.delete('/:id', deleteSingleFavorite);


module.exports = router
