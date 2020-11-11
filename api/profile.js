export default (axios) => ({
  profile(id) {
    return axios.get(`/profile/${id}/`)
  },
})
