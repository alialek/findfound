import qs from 'qs'
export default function ({ $axios, store, app }, inject) {
  const api = $axios.create({
    baseURL: 'https://hr-itmo.herokuapp.com/api/',
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json',
    },
    paramsSerializer: (params) => {
      return qs.stringify(params)
    },
  })

  const request = $axios.create({
    baseURL: 'https://hr-itmo.herokuapp.com/api/',
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json',
    },
    paramsSerializer: (params) => {
      return qs.stringify(params)
    },
  })
  localStorage.getItem('user_ff').length
    ? api.setToken(`Token ${localStorage.getItem('user_ff')}`)
    : api.setToken(false)

  $axios.onRequest(() => {
    store.commit('processes/LOADING_START')
  })

  $axios.onResponse(() => {
    store.commit('processes/LOADING_STOP')
  })
  $axios.onRequestError(() => {
    store.commit('processes/SET_ERROR', 'Кажется, у вас проблемы с интернетом')
  })
  $axios.onResponseError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      store.commit('processes/SET_ERROR', error.response.data)
    } else if (code === 404) {
      store.commit('processes/SET_ERROR', 'Не найдено')
    } else if (code === 401) {
      store.commit('processes/SET_ERROR', 'Кажется, надо еще раз войти')
      app.router.push('/login')
    } else {
      store.commit('processes/SET_ERROR', 'Неопознанная ошибка')
    }
  })

  inject('http', api)
  inject('req', request)
}
