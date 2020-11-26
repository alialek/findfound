export default (axios) => ({
  registration(data) {
    return axios.post('/users/', data)
  },
  /**
   * Получить информацию о свое профиле
   */
  getUserInfo() {
    return axios('/users/me/')
  },
  /**
   * Обновить информацию о профиле
   * @param {object} data
   */
  updateUserInfo(data) {
    return axios.put('/users/me/', data)
  },
  /**
   * Удалить свою страницу
   */
  deleteUser() {
    return axios.delete('/users/me/')
  },
})
