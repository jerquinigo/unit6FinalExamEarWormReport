import axios from 'axios';


export const fetchAllSongs = () => {
  return axios.get('/api/songs')
}

export const createNewSong = (song) => {
  return axios.post('/api/songs', song)
}
