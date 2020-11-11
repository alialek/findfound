export default (axios) => ({
  specializations(data) {
    return axios.get('/specializations/')
  },
})
