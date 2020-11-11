export const state = () => ({
  isLoading: false,
  isError: '',
  snack: {
    enabled: false,
    text: '',
    color: 'error',
  },
})

export const mutations = {
  SET_ERROR(state, data) {
    state.snack.enabled = true
    state.snack.color = 'error'
    state.snack.text = data
  },
  SET_SUCCESS(state, data) {
    state.snack.enabled = true
    state.snack.color = 'success'
    state.snack.text = data
  },
  LOADING_STOP(state) {
    state.isLoading = false
  },
  LOADING_START(state) {
    state.isLoading = true
  },
}
