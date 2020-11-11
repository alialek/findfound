export default (axios) => ({
  cities(data) {
    return axios.get('/cities/')
  },
})
