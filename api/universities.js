export default (axios) => ({
  universities(data) {
    return axios.get('/universities/')
  },
})
