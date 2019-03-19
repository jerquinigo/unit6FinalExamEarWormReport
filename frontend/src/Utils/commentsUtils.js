import axios from 'axios'


export const fetchAllComments = () => {
  return axios.get('/api/comments')
}

export const createNewComment = (comment) => {
  return axios.post('/api/comments', comment)
}
