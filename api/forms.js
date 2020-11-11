export default (axios) => ({
  // Создание резюме
  forms(data) {
    return axios.post(`/forms/`, data)
  },
  // Администратор создает резюме за пользователя
  createUserResume(data, id) {
    return axios.post(`/forms/?student=${id}`, data)
  },
})
