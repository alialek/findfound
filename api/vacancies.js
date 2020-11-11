export default (axios) => ({
  vacancies(params) {
    console.log(params)
    return axios.get('/vacancies/', params)
  },

  getVacancies() {
    return axios.get('/vacancies/')
  },

  postVacancy(data, id = 0) {
    return axios.post(id ? `/vacancies/?company${id}` : '/vacancies/', data)
  },

  getVacancyById(id) {
    return axios.get(`/vacancies/${id}/`)
  },
})
