<template>
  <v-row v-if="Object.keys(vacancy) !== 0" class="vacancy">
    <v-col class="cols-12 px-10 cols-md-6">
      <h1 class="vacancy__title" style="margin-top: 100px">
        {{ vacancy.name }}
      </h1>
      <div
        style="cursor: pointer; margin-top: 8px"
        class="d-row pd-unset align-center"
        @click="$router.push(`company?id=${vacancy.company_id}`)"
      >
        <div
          :style="`height: 48px; width: 48px;background-size: contain; margin-right: 16px;background-image: url(${
            vacancy.company_logo || ''
          })`"
        ></div>
        <span class="vacancy__author">{{ vacancy.company_name }}</span>
        <!-- <v-icon class="ml-2" style="font-size: 20px">mdi-check-circle</v-icon> -->
      </div>

      <span class="vacancy__field">Описание</span>
      <div style="margin-top: 24px">
        <!-- <Post-viewer :post="JSON.parse(vacancy.description)" /> -->
      </div>
      <v-divider style="margin-top: 48px"></v-divider>
      <div class="d-row align-center" style="margin-top: 24px">
        <v-btn depressed color="primary" rounded @click="response"
          >Откликнуться</v-btn
        >
        <!-- <v-btn depressed fab color="primary" class="ml-4" small><v-icon>mdi-heart-outline</v-icon></v-btn> -->
      </div>
    </v-col>
    <v-col class="cols-12 px-10 cols-md-6">
      <span class="vacancy__field">Заработная плата</span>
      <h2 class="vacancy__salary">{{ vacancy.salary }}₽</h2>
      <v-divider style="margin: 32px 0px"></v-divider>
      <span style="margin-top: 0px" class="vacancy__field">Адрес</span>
      <b style="margin-top: 16px">{{ vacancy.city }}</b>
      <span class="vacancy__field">Навыки:</span>
      <div v-if="vacancy.skills !== []" class="d-row" style="margin-top: 24px">
        <div
          v-for="skill in vacancy.skills"
          :key="skill.id"
          style="margin-left: 8px"
          class="team-card__external"
        >
          {{ skill.text }}
        </div>
      </div>
      <span class="vacancy__field">Условия:</span>
      <div class="d-col" style="margin-top: 24px">
        <div
          style="margin-top: 8px; width: fit-content"
          class="team-card__external"
        >
          Опыт: {{ vacancy.employment_type.text }}
        </div>
        <div
          style="margin-top: 8px; width: fit-content"
          class="team-card__external"
        >
          График: {{ vacancy.schedule_type.text }}
        </div>
        <div
          style="margin-top: 8px; width: fit-content"
          class="team-card__external"
        >
          Занятость: {{ vacancy.experience_type.text }}
        </div>
      </div>
      <v-divider style="margin: 32px 0px"></v-divider>
      <span style="margin-top: 0px" class="vacancy__field">Контакты:</span>
      <span
        v-if="vacancy.company.phone"
        style="margin-top: 16px"
        class="font-weight-bold"
        ><v-icon style="margin-right: 8px">mdi-phone</v-icon
        >{{ vacancy.company.phone }}</span
      >
      <span style="margin-top: 16px" class="font-weight-bold"
        ><v-icon style="margin-right: 8px">mdi-email-open-outline</v-icon
        >{{ vacancy.company.email }}</span
      >
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'VacancyView',
  props: ['vacancy'],
  mounted() {
    console.log('inner', this.vacancy)
  },
  methods: {
    response() {
      this.$api.requests.sendResponse({ vacancy: this.id }).then(() => {
        this.$store.commit('processes/SET_SUCCESS', 'Отклик доставлен')
      })
    },
  },
}
</script>

<style></style>
