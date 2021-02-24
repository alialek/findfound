export const state = () => ({
  project: {},
  responses: [],
})

export const mutations = {
  setProject(state, data) {
    state.project = data
  },
  setResponses(state, data) {
    state.responses = data
  },
  filterVacancies(state, id) {
    console.log(id)
    state.project.vacancies = state.project.vacancies.filter((v) => v.id !== id)
  },
  updateDecision(state, data) {
    state.responses = state.responses.map((r) => {
      if (r.response_id === data.id) {
        r.response_decision = data.decision
      }
      return r
    })
  },
}
export const actions = {
  getProject({ commit }, id) {
    window.$nuxt.$api.projects.getProjectById(id).then((res) => {
      commit('setProject', res.data)
    })
  },
  getInvitations({ commit }, data) {
    window.$nuxt.$api.invitations.getInvitations(data).then((res) => {
      commit('setResponses', res.data)
    })
  },
}
