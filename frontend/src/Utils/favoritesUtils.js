import axios from 'axios'

export const fetchAllFavorites = () => {
  return axios.get('/api/favorites')
}

export const fetchAllFavoritesForSingleUser = (id) => {
return axios.get(`/api/favorites/user/${id}`)
}


export const createNewFavorite = (favorite) => {
  return axios.post('/api/favorites', favorite)
}
