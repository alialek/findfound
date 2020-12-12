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
