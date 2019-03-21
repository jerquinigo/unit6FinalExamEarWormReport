import axios from 'axios'

export const fetchAllGenres = () => {
  return axios.get('/api/genres')
}


export const fetchAllSongsBySpecificGenre = (id) => {
  return axios.get(`/api/genres/${id}`)
}
