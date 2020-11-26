export default (axios) => ({
  /**
   * Поиск по вакансиям
   * @param {object} params Параметры поиска
   * @param params.text Текст
   * @param params.skill ID скилла
   */
  vacancies(params) {
    return axios.get('/vacancies/', params)
  },

  getVacancies() {
    return axios.get('/vacancies/')
  },
  /**
   * Создать вакансию
   * @param {object} data
   */

  createVacancy(data) {
    return axios.post('/vacancies/', data)
  },
  /**
   * Удалить вакансию
   * @param {number} id
   */

  deleteVacancy(id) {
    return axios.delete(`/vacancies/${id}`)
  },
  /**
   * Обновить вакансию
   * @param {object} data
   * @param {number} id
   */
  updateVacancy(data, id = 0) {
    return axios.post(`/vacancies/?company${id}`, data)
  },
  /**
   * Получить вакансию по ID
   * @param {number} id
   */
  getVacancyById(id) {
    return axios.get(`/vacancies/${id}/`)
  },
})
