export default (axios) => ({
  /**
   * Получить все проекты
   */
  getProjects() {
    return axios(`/projects/`)
  },
  /**
   * Получить конкретный проект
   * @param id Идентификатор
   */
  getProjectById(id) {
    return axios(`/projects/${id}/`)
  },
  /**
   * Загрузить лого
   * @param {object} data лого
   */
  uploadLogo(id, data) {
    return axios.post(`/projects/${id}/logo/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  /**
   * Загрузить лого
   * @param {object} data лого
   */
  uploadRolePhoto(data) {
    return axios.post(`/projects/role-photo/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  /**
   * Создать проект
   * @param data Объект с проектом
   */
  createProject(data) {
    return axios.post(`/projects/`, data)
  },
  /**
   * Обновить проект
   * @param data Объект с проектом
   */
  updateProject(data, id) {
    return axios.put(`/projects/${id}/`, data)
  },
  /**
   * Удалить проект
   */
  deleteProject(id) {
    return axios.delete(`/projects/${id}/`)
  },
})
