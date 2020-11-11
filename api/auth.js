export default (axios) => ({
  login({ email, password }) {
    return axios.post('/auth/', { email, password })
  },

  getUserInfo() {
    return axios.get('/auth/')
  },
})
