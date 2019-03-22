import axios from 'axios';


export const fetchAllSongs = () => {
  return axios.get('/api/songs')
}

export const createNewSong = (song) => {
  return axios.post('/api/songs', song)
}


export const fetchAllSongsBySpecificGenre = (id) => {
  return axios.get(`/api/songs/genre/${id}`)
}


export const fetchallSongsPostedBySpecificUser = (id) => {
  return axios.get(`/api/songs/user/${id}`)
}
