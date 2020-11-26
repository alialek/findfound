export default (axios) => ({
  /**
   * Получить приглашения
   * @param {object} params Чтобы получить все отклики на свои вакансии - me=creator. Чтобы получить все ответы проектов на свои отклики - me=member. Чтобы получить оба варианта ?me=member&me=creator или /
   */
  getInvitations(params) {
    return axios(`/invitations/`, params)
  },
  /**
   * Посмотреть приглашение по ID
   * @param {number} id
   */
  getInvitationById(id) {
    return axios(`/invitations/${id}`)
  },
  /**
   * @param data Объект с ID вакансии.
   * @param data.vacancy_id ID вакансии.
   */
  sendInvitation(data) {
    return axios(`/invitations/`, data)
  },
  /**
   * Ответить на приглашение по ID
   * @param {number} id
   */
  respondInvitationById(id) {
    return axios.put(`/invitations/${id}`)
  },
  /**
   * Ответить на приглашение по ID
   * @param {number} id
   */
  deleteInvitationById(id) {
    return axios.delete(`/invitations/${id}`)
  },
})
