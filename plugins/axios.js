import qs from 'qs'
export default function ({ $axios, store, app, root }, inject) {
  const api = $axios.create({
    baseURL: 'https://findfoundme.herokuapp.com/api/',
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json',
    },
    paramsSerializer: (params) => {
      return qs.stringify(params)
    },
  })

  const request = $axios.create({
    baseURL: 'https://findfoundme.herokuapp.com/api/',
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json',
    },
    paramsSerializer: (params) => {
      return qs.stringify(params)
    },
  })
  const token = localStorage.getItem('user_ff') || store.state.utils.token
  token
    ? api.setToken(`Token ${localStorage.getItem('user_ff')}`)
    : api.setToken(false)

  api.onRequest((req) => {
    if (req.method === 'post' || req.method === 'put') {
      store.commit('processes/BLOCKED_LOADING_START')
    }
  })

  api.onResponse((req) => {
    if (req.config.method === 'post' || req.config.method === 'put') {
      store.commit('processes/BLOCKED_LOADING_STOP')
    }
  })
  api.onRequestError(() => {
    store.commit('processes/SET_ERROR', 'Кажется, у вас проблемы с интернетом')
  })
  api.onResponseError((error) => {
    store.commit('processes/BLOCKED_LOADING_STOP')
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      store.commit('processes/SET_ERROR', error.response.data)
    } else if (code === 404) {
      store.commit('processes/SET_ERROR', 'Не найдено')
    } else if (code === 401) {
      localStorage.removeItem('user_ff')
      store.commit('processes/SET_ERROR', 'Кажется, надо войти')
      app.router.push('/login')
    } else {
      store.commit('processes/SET_ERROR', 'Неопознанная ошибка')
    }
  })

  inject('http', api)
  inject('req', request)
}
