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
   * Загрузить фото
   * @param {object} data фото
   */
  uploadUserPhoto(id, data) {
    return axios.post(`/users/${id}/photo/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  /**
   * Удалить свою страницу
   */
  deleteUser() {
    return axios.delete('/users/me/')
  },
})
