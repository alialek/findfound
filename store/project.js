export const state = () => ({
  project: {},
  invitations: [],
})

export const mutations = {
  setProject(state, data) {
    state.project = data
  },
  setInvitations(state, data) {
    state.invitations = data
  },
}
export const actions = {
  getProject({ commit }, id) {
    window.$nuxt.$api.projects.getProjectById(id).then((res) => {
      commit('setProject', res.data)
    })
  },
  getInvitations({ commit }, data) {
    window.$nuxt.$api.invitationss.getInvitations(data).then((res) => {
      commit('setInvitations', res.data)
    })
  },
}
