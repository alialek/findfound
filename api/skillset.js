export default (axios) => ({
  skillset(params) {
    return axios('https://api.hh.ru/suggests/skill_set', { params })
  },
})
