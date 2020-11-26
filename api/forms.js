export default (axios) => ({
  /**
   * Создание резюме
   * @param {object} data Объект с данными резюме
   */
  createForm(data) {
    return axios.post(`/forms/`, data)
  },
  /**
   * Создание резюме Администратором
   * @param {object} data Объект с данными резюме
   */ createUserResume(data, id) {
    return axios.post(`/forms/?student=${id}`, data)
  },
  /**
   * Получить резюме
   * @param {number} id ID пользователя
   */
  getFormById(id) {
    return axios(`/forms/${id}/`)
  },
  /**
   * Получить все резюме
   */
  getForms(id) {
    return axios(`/forms/`)
  },
  /**
   * Обновить резюме
   * @param {object} data
   * @param {number} id
   */
  updateFormById(data, id) {
    return axios.put(`/forms/${id}/`, data)
  },
  /**
   * Удалить резюме пользователя
   * @param {number} id Id пользователя
   */
  deleteFormById(id) {
    return axios.delete(`/forms/${id}/`)
  },
})
