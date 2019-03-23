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


export const deleteFavorite = (id) => {
  return axios.delete(`/api/favorites/${id}`)
}

export const getAllFavoritesByUniqueId = (id) => {
  return axios.get(`/api/favorites/unique/${id}`)
}

export const getAllFavoritesInDesc = () => {
  return axios.get('/api/favorites/desc')
}
