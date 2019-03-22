import axios from 'axios'


export const fetchSingleUser = (id) => {
  return axios.get(`/api/users/${id}`)
}

export const fetchAllUsers = () => {
  return axios.get('/api/users')
}
