export default (axios) => ({
  getMetrics() {
    return axios.get(`/metrics/`)
  },
})
