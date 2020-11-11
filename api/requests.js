export default (axios) => ({
  sendResponse(data) {
    return axios.post('/requests/', data)
  },
  putDecisionOnResponse(id, data) {
    return axios.put(`/requests/${id}/`, data)
  },
  getResponses(id) {
    return axios.get(`/requests/`)
  },
})
