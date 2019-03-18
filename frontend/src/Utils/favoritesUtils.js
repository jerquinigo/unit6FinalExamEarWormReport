import axios from 'axios'

export const fetchAllFavorites = () => {
  return axios.get('/api/favorites')
}
