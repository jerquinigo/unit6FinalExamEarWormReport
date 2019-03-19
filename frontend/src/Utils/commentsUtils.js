import axios from 'axios'


export const fetchAllComments = () => {
  return axios.get('/api/comments')
}
