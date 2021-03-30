export const state = () => ({
  isLoading: false,
  isBlockedLoading: false,
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
  HIDE_SNACKBAR(state) {
    state.snack.enabled = false
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
  BLOCKED_LOADING_STOP(state) {
    state.isBlockedLoading = false
  },
  BLOCKED_LOADING_START(state) {
    state.isBlockedLoading = true
  },
}
