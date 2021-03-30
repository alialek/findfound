<template>
  <div>
    <div v-if="vacancy.hasOwnProperty('id')" class="d-row vacancy">
      <v-col class="col-12 pl-4 col-md-8">
        <h1 class="vacancy__title">
          {{ vacancy.name }}
        </h1>
        <div
          class="vacancy__company d-row pd-unset align-center"
          @click="$router.push(`project?id=${vacancy.company_id}`)"
        >
          <div
            class="vacancy__logo"
            v-if="vacancy.company_logo"
            :style="`background-image: url(${
              vacancy.is_external
                ? vacancy.company_logo
                : `https://findfoundbucket.s3.amazonaws.com/media/${vacancy.company_logo}`
            })`"
          ></div>
          <v-icon v-else alt="logo" size="56" class="team-card__logo"
            >mdi-domain</v-icon
          >
          <span class="vacancy__author">{{ vacancy.company_name }}</span>
          <!-- <v-icon class="ml-2" style="font-size: 20px">mdi-check-circle</v-icon> -->
        </div>
        <div class="hidden-md-and-up">
          <div class="mt-6 d-block small-header">Заработная плата</div>
          <h2 class="vacancy__salary">{{ vacancy.salary }}₽</h2>

          <div v-if="vacancy.skills.length" class="small-header mt-6">
            Навыки:
          </div>
          <div
            v-if="vacancy.skills.length"
            class="d-row mt-3 vacancy__skill-chips"
          >
            <div
              v-for="skill in vacancy.skills"
              :key="skill.id"
              class="custom-chip"
            >
              {{ skill.text }}
            </div>
          </div>
          <span style="margin-top: 48px" class="d-block small-header"
            >Условия:</span
          >
          <div class="d-row" style="margin-top: 12px; gap: 8px">
            <div style="width: fit-content" class="custom-chip">
              Опыт: {{ vacancy.experience_type.text }}
            </div>
            <div style="width: fit-content" class="custom-chip">
              График: {{ vacancy.schedule_type.text }}
            </div>
            <div style="width: fit-content" class="custom-chip">
              Занятость: {{ vacancy.employment_type.text }}
            </div>
          </div>
        </div>

        <span class="small-header">Описание</span>
        <div style="margin-top: 24px">
          <Post-viewer
            v-if="!vacancy.is_external"
            :post="JSON.parse(vacancy.description)"
          />
          <div v-else v-html="vacancy.description"></div>
        </div>
        <div class="hidden-md-and-up">
          <div style="margin-top: 12px" class="small-header">Адрес</div>
          <b class="d-block" style="margin-top: 16px">{{
            vacancy.city.name
          }}</b>
          <div style="margin-top: 24px">
            <span class="small-header">
              <v-icon>mdi-eye</v-icon> {{ vacancy.views }} просмотров</span
            ><br />
            <span class="small-header">
              <v-icon>mdi-calendar</v-icon>
              {{
                new Date(vacancy.created).toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                })
              }}</span
            >
          </div>
        </div>
        <v-divider style="margin: 32px 0"></v-divider>
        <div class="d-row align-center">
          <div v-if="!vacancy.is_creator && vacancy.is_external" class="mb-8">
            <v-btn
              v-if="!vacancy.is_requested"
              depressed
              color="primary"
              rounded
              style="color: white !important"
              :href="vacancy.url"
              target="_blank"
              >Открыть в источнике</v-btn
            >
          </div>
          <div v-if="!vacancy.is_creator && !vacancy.is_external" class="mb-8">
            <v-btn
              v-if="!vacancy.is_requested"
              depressed
              color="primary"
              rounded
              @click="response"
              >Откликнуться</v-btn
            >
            <span v-else class="small-header"
              >Вы уже откликались на эту вакансию.
              <!-- <span @click="withdrawResponse">Отменить?</span></span -->
            </span>
          </div>

          <span v-if="vacancy.is_creator" class="small-header"
            >Вы автор этой вакансии</span
          >
        </div>
      </v-col>
      <v-col class="col-12 px-10 col-md-4 d-none d-md-block salary-section">
        <div v-if="vacancy.salary">
          <span class="small-header">Заработная плата</span>
          <h2 class="vacancy__salary">{{ vacancy.salary }}₽</h2>
        </div>
        <div v-else>
          <span class="small-header">Условия участия</span>
          <h2 class="vacancy__partnership">{{ vacancy.partnership }}</h2>
        </div>
        <v-divider class="my-8"></v-divider>
        <span class="small-header mt-0">Адрес</span>
        <b class="d-block" style="margin-top: 16px">{{ vacancy.city.name }}</b>

        <span v-if="vacancy.skills.length" class="d-block small-header mt-12"
          >Навыки:</span
        >
        <div v-if="vacancy.skills.length" class="d-row mt-6" style="gap: 8px">
          <div
            v-for="skill in vacancy.skills"
            :key="skill.id"
            class="custom-chip"
          >
            {{ skill.text }}
          </div>
        </div>
        <span class="d-block mt-12 small-header">Условия:</span>
        <div class="d-row mt-6" style="gap: 8px">
          <div style="width: fit-content" class="custom-chip">
            Опыт: {{ vacancy.experience_type.text }}
          </div>
          <div style="width: fit-content" class="custom-chip">
            График: {{ vacancy.schedule_type.text }}
          </div>
          <div style="width: fit-content" class="custom-chip">
            Занятость: {{ vacancy.employment_type.text }}
          </div>
        </div>
        <v-divider class="my-8"></v-divider>
        <span class="small-header mt-0">
          <v-icon>mdi-eye</v-icon> {{ vacancy.views }}</span
        >
        <span class="small-header mt-0">
          <v-icon>mdi-calendar</v-icon>
          {{
            new Date(vacancy.created).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
            })
          }}</span
        >

        <!-- <span style="margin-top: 0px" class="small-header">Контакты:</span> -->
        <!-- <span
          v-if="vacancy.company.phone"
          style="margin-top: 16px"
          class="font-weight-bold"
          ><v-icon style="margin-right: 8px">mdi-phone</v-icon
          >{{ vacancy.company.phone }}</span
        >
        <span style="margin-top: 16px" class="font-weight-bold"
          ><v-icon style="margin-right: 8px">mdi-email-open-outline</v-icon
          >{{ vacancy.company.email }}</span
        > -->
      </v-col>
    </div>
    <div v-else class="d-row justify-center mt-8">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </div>
</template>

<script>
import PostViewer from '@/atoms/Post-viewer.vue'
import './Page.css'
export default {
  transition: 'fade',
  name: 'Vacancy',
  components: {
    PostViewer,
  },
  fetch() {
    this.$store.commit('processes/LOADING_START')
    this.$api.vacancies
      .getVacancyById(this.$route.query.id)
      .then((res) => {
        this.vacancy = res.data
      })
      .finally(() => this.$store.commit('processes/LOADING_STOP'))
  },
  asyncData({
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error,
    $api,
  }) {},
  data() {
    return {
      isLoading: false,
      vacancy: {},
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    },
  },

  methods: {
    updateVacancy() {},
    withdrawResponse() {
      this.$api.invitations.deleteInvitationById(this.id).then((res) => {
        this.$store.commit('processes/SET_SUCCESS', 'Отклик отменен')
        this.vacancy.is_requested = false
      })
    },
    response() {
      this.$api.invitations
        .sendInvitation({ vacancy_id: this.id })
        .then(() => {
          this.$store.commit('processes/SET_SUCCESS', 'Отклик доставлен')
          this.vacancy.is_requested = true
        })
        .catch((err) => {
          if ([401, 403].includes(err.response.status)) {
            this.$store.commit('processes/SET_ERROR', 'Вы не авторизовались')
            this.$router.push('/login')
          }
        })
    },
  },
}
</script>

<style>
.vacancy__title {
  font-family: Gilroy;
  font-style: normal;
  font-weight: 400;
  font-size: 48px;
  line-height: 57px;
}

.vacancy__company {
  cursor: pointer;
  margin-top: 8px;
}

.vacancy__skill-chips {
  gap: 8px;
}

.vacancy__author {
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;

  letter-spacing: 0.4px;
}

.vacancy__logo {
  height: 48px;
  width: 48px;
  background-size: cover;
  margin-right: 16px;
  border-radius: 100px;
}

.vacancy__salary {
  font-family: Gilroy;
  font-style: normal;
  font-weight: 400;
  font-size: 48px;
  line-height: 57px;
  letter-spacing: 0.25px;
}
.vacancy__partnership {
  font-family: Gilroy;
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 35px;
  letter-spacing: 0.25px;
}
@media (min-width: 960px) {
  .salary-section {
    margin-top: 100px;
  }
}
</style>
