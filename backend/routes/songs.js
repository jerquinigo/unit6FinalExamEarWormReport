var express = require('express');
var router = express.Router();
const {getAllSongs, getSongsBySpecificGenre, allSongsPostedBySpecificUser, getOneSong, createNewSong, deleteSingleSong} = require('../db/queries/songsQueries.js')


router.get('/', getAllSongs);
router.get('/genre/:id', getSongsBySpecificGenre);
router.get('/user/:id', allSongsPostedBySpecificUser);
router.get('/singleSong/:id', getOneSong);
router.post('/', createNewSong);
router.delete('/:id', deleteSingleSong);


module.exports = router
