export const state = () => ({
  user: {},
  vacancy: {},
  search: '',
  vacancies: [],
})

export const mutations = {
  setVacancies(state, data) {
    state.vacancies = data
  },

  setVacancy(state, data) {
    state.vacancy = data
  },
  disableVacancyResponse(state) {
    state.vacancy = { ...state.vacancy, is_requested: true }
  },
}
