export const state = () => ({
  token: null,
  role: null,
  contacts: [
    {
      id: 'github',
      name: 'GitHub',
      icon: 'mdi-github',
      value: '',
    },
    {
      id: 'linkedin',
      name: 'Linkedin',
      icon: 'mdi-linkedin',
      value: '',
    },
    {
      id: 'website',
      name: 'Сайт',
      icon: 'mdi-web',
      value: '',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'mdi-facebook',
      value: '',
    },
    {
      id: 'vk',
      name: 'ВКонтакте',
      icon: 'mdi-vk',
      value: '',
    },
    {
      id: 'telegram',
      name: 'Телеграм',
      icon: 'mdi-telegram',
      value: '',
    },
    { id: 'twitter', name: 'Твиттер', icon: 'mdi-twitter', value: '' },
    {
      id: 'instagram',
      name: 'Инстаграм',
      icon: 'mdi-instagram',
      value: '',
    },
  ],
  experience_types: [
    {
      id: 1,
      name: 'Опыт не требуется',
    },
    {
      id: 2,
      name: 'Опыт от 1 года',
    },
    {
      id: 3,
      name: 'Опыт 3+ лет',
    },
    {
      id: 4,
      name: 'Опыт 5+ лет',
    },
  ],
  employment_types: [
    {
      id: 1,
      name: 'Полная',
    },
    {
      id: 2,
      name: 'Частичная',
    },
    {
      id: 3,
      name: 'Стажировка',
    },
    {
      id: 4,
      name: 'Практика',
    },
  ],
  schedule_types: [
    {
      id: 1,
      name: 'Полный день',
    },
    {
      id: 2,
      name: 'Гибкий график',
    },
    {
      id: 3,
      name: 'Удаленочка',
    },
  ],
  degrees: [
    {
      id: 'BACHELOR',
      name: 'Бакалавр',
    },
    {
      id: 'MASTER',
      name: 'Магистр',
    },
  ],
  decision: {
    NO_ANSWER: 'Не отвечено',
    ACCEPT: 'Приглашение',
    DECLINE: 'Отказ',
  },
  universities: [],
  specializations: [],
  cities: [],
  rules: {
    email: (v, text = 'Неверный email') =>
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        v
      ) || text,
    required: (value, text = 'Обязательное поле.') => !!value || text,
    min: (v, text = 'Минимум 8 символов') => v.length >= 8 || text,
  },
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
    Promise.all([
      window.$nuxt.$api.universities.universities(),
      window.$nuxt.$api.specializations.specializations(),
      window.$nuxt.$api.cities.cities(),
    ]).then((values) => {
      commit('SET_UNIVERSITIES', values[0].data)
      commit('SET_SPECIALIZATIONS', values[1].data)
      commit('SET_CITIES', values[2].data)
    })
  },
}
