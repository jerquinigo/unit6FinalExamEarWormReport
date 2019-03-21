import axios from 'axios'

export const fetchAllGenres = () => {
  return axios.get('/api/genres')
}
