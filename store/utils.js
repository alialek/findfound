export const state = () => ({
  token: null,
  role: null,
  universities: [],
  specializations: [],
  cities: [],
  sex: [
    {
      text: 'Мужской',
      value: 'MALE',
    },
    {
      text: 'Женский',
      value: 'FEMALE',
    },
  ],
})

export const mutations = {
  SET_TOKEN(state, data) {
    state.token = data
  },
  SET_ROLE(state, data) {
    state.role = data
  },
  SET_CITIES(state, data) {
    state.cities = data
  },
  SET_SPECIALIZATIONS(state, data) {
    state.specializations = data
  },
  SET_UNIVERSITIES(state, data) {
    state.universities = data
  },
}
export const actions = {
  getToken({ commit }) {
    commit('SET_TOKEN', localStorage.getItem('user_ff'))
  },
  getRole({ commit }) {
    commit('SET_ROLE', localStorage.getItem('role_ff'))
  },
  getConstants({ commit }) {
    console.log(arguments)
    Promise.all([
      window.$nuxt.$api.universities.universities(),
      window.$nuxt.$api.specializations.specializations(),
      window.$nuxt.$api.cities.cities(),
    ]).then((values) => {
      commit('SET_UNIVERSITIES', values[0])
      commit('SET_SPECIALIZATIONS', values[1])
      commit('SET_CITIES', values[2])
    })
  },
}
