export const state = () => ({
  info: {},
  vacancies: [],
})

export const mutations = {
  setUser(state, data) {
    if (data.university_id) data.university_id = +data.university_id
    state.info = data
  },
  setVacancies(state, data) {
    state.vacancies = data
  },
}
export const actions = {
  getUserInfo({ commit }) {
    window.$nuxt.$api.users.getUserInfo().then((res) => {
      commit('setUser', res.data)
    })
  },
}
