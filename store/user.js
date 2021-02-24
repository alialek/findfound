export const state = () => ({
  info: {},
  vacancies: [],
  responses: [],
})

export const mutations = {
  setUser(state, data) {
    state.info = data
  },
  setVacancies(state, data) {
    state.vacancies = data
  },
  setResponses(state, data) {
    state.responses = data
  },
  filterUserCompanies(state, id) {
    state.info.companies = state.info.companies.filter(
      (company) => company.id !== id
    )
  },
}
export const actions = {
  getUserInfo({ commit }) {
    window.$nuxt.$api.users.getUserInfo().then((res) => {
      commit('setUser', res.data)
    })
  },
  getResponses({ commit }) {
    window.$nuxt.$api.invitations
      .getInvitations({ me: 'member' })
      .then((res) => {
        commit('setResponses', res.data)
      })
  },
}
