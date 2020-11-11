export default (axios) => ({
  registration(data) {
    return axios.post('/users/', data)
  },
})
