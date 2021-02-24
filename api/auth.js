export default (axios) => ({
  login({ email, password }) {
    return axios.post('/auth/', { email, password })
  },
  VKAuth(code) {
    return axios.post('/auth/vk/', { code })
  },

  getUserInfo() {
    return axios.get('/auth/')
  },
})
