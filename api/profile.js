export default (axios) => ({
  /**
   * Получить информацию о профиле
   * @param {number} id
   */
  profile(id) {
    return axios.get(`/profile/${id}/`)
  },
})
