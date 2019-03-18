import axios from 'axios';


export const fetchAllSongs = () => {
  return axios.get('/api/songs')
}
