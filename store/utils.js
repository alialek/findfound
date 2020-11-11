export const state = () => ({
  token: null,
  role: null,
})

export const mutations = {
  SET_TOKEN(state, data) {
    state.token = data
  },
  SET_ROLE(state, data) {
    state.role = data
  },
}
export const actions = {
  getToken({ commit }) {
    commit('SET_TOKEN', localStorage.getItem('user_ff'))
  },
  getRole({ commit }) {
    commit('SET_ROLE', localStorage.getItem('role_ff'))
  },
}
