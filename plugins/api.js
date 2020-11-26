import auth from '~/api/auth'
import cities from '~/api/cities'
import companies from '~/api/companies'
import forms from '~/api/forms'
import invitations from '~/api/invitations'
import metrics from '~/api/metrics'
import profile from '~/api/profile'
import projects from '~/api/projects'
import requests from '~/api/requests'
import skillset from '~/api/skillset'
import specializations from '~/api/specializations'
import students from '~/api/students'
import universities from '~/api/universities'
import users from '~/api/users'
import vacancies from '~/api/vacancies'

export default ({ $http, $req }, inject) => {
  // Инициализация репозиториев API
  const repositories = {
    auth: auth($http),
    cities: cities($http),
    companies: companies($http),
    forms: forms($http),
    invitations: invitations($http),
    metrics: metrics($http),
    profile: profile($http),
    projects: projects($http),
    requests: requests($http),
    skillset: skillset($req),
    specializations: specializations($http),
    students: students($http),
    universities: universities($http),
    users: users($http),
    vacancies: vacancies($http),
  }
  inject('api', repositories)
}
