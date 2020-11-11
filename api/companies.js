export default (axios) => ({
  createCompany(data) {
    return axios.post('/companies/', data)
  },

  company(id) {
    return axios.get(`/companies/${id}/`)
  },

  getCompanies(id) {
    return axios.get(`/companies/`)
  },
})
