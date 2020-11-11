const getRandom = () => {
  return [
    {
      id: Math.random(),
      title: 'Frontend-разработчик',
      company: 'Университет ИТМО',
      logo: 'https://itmo.ru/file/pages/213/itmo_small_white_eng.jpg',
    },
    {
      id: Math.random(),
      title: 'Backend-разработчик',
      company: 'OZON',
      logo: 'https://cdn1.ozone.ru/s3/cms/9e/t9d/icon.png',
    },
    {
      id: Math.random(),
      title: 'UI-дизайнер',
      company: 'Сбер',
      logo:
        'https://pbs.twimg.com/profile_images/1309044913678487552/VyFIANEr_400x400.jpg',
    },
  ]
}

export const state = () => ({
  user: {},
  employer: {
    title: 'Университет ИТМО',
    vacancies: getRandom(),
    description: 'еуые',
  },
  vacancy: {},
  random: getRandom(),
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
}
