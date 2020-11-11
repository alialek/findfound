export default (axios) => ({
  getUsers(data) {
    return axios.get('/students/')
  },
})
