<template>
  <div class="justify-center d-row">
    <v-col styclass="main pd-unset justify-space-evenly ">
      <div
        style="margin-top: 64px; width: 90%"
        class="mx-auto main__search d-col pd-unset"
      >
        <v-text-field
          v-model="searchField.search"
          style="width: 100%"
          cache-items
          class="searchField"
          full-width
          flat
          dense
          outlined
          append-icon="mdi-magnify"
          hide-no-data
          hide-details
          placeholder="Поиск вакансий"
          @input="sendRequest"
        ></v-text-field>
        <v-row>
          <v-col cols="3">
            <v-combobox
              v-model="searchField.skills"
              :items="entries"
              :loading="isLoading"
              :search-input.sync="searchSkill"
              hide-no-data
              outlined
              item-text="text"
              item-value="id"
              small-chips
              placeholder="Django, Figma..."
              label="Навыки"
              multiple
              return-object
            ></v-combobox>
          </v-col>
          <v-col cols="3"
            ><v-select
              v-model="searchField.employment_type"
              small-chips
              outlined
              item-text="name"
              item-value="id"
              label="Тип занятости"
              :items="employment_types"
              placeholder="Ищешь стажировку?"
            >
            </v-select
          ></v-col>
          <v-col cols="3"
            ><v-select
              v-model="searchField.experience_type"
              small-chips
              item-text="name"
              item-value="id"
              label="Опыт"
              outlined
              :items="experience_types"
              placeholder="Есть опыт?"
            >
            </v-select
          ></v-col>
          <v-col cols="3"
            ><v-select
              v-model="searchField.schedule_type"
              small-chips
              item-text="name"
              item-value="id"
              outlined
              :items="schedule_types"
              label="Режим работы"
              placeholder="Может, удаленочка?"
            >
            </v-select
          ></v-col>
        </v-row>
        <div class="d-col main__slide">
          <div v-if="!loading && vacancies.length">
            <span class="text-body-1 text--secondary"
              >Найдено вакансий: {{ vacancies.length }}
            </span>
            <div class="d-row justify-space-between">
              <t-card
                v-for="vacancy in vacancies"
                :id="vacancy.id"
                :key="vacancy.id"
                :title="vacancy.name"
                :company_id="vacancy.company_id"
                :company="vacancy.company_name"
                :description="vacancy.short_description"
                :logo="vacancy.company_logo"
                :skills="vacancy.skills"
                :external="vacancy.external"
                :link="vacancy.link"
              />
            </div>
          </div>
          <v-row v-if="loading" class="justify-center">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </v-row>
          <v-row
            v-if="!loading && vacancies.length === 0"
            class="justify-center align-center"
          >
            <v-card elevation="0">
              <v-col style="text-align: center">
                <placeholder
                  emoji="/img/e_magnify.png"
                  class="my-6"
                  text="Ничего не найдено"
                  >Попробуйте изменить параметры поиска</placeholder
                >
              </v-col>
            </v-card>
          </v-row>
        </div>
      </div>
    </v-col>
  </div>
</template>

<script>
import TCard from '@/atoms/TCard.vue'
import Placeholder from '~/atoms/Placeholder.vue'
export default {
  name: 'Main',
  components: { TCard, Placeholder },
  data() {
    return {
      entries: [],
      isLoading: false,
      searchSkill: '',
      loading: false,
      items: [],
      searchField: {
        search: '',
        experience_type: '',
        schedule_type: '',
        employment_type: '',
        skills: null,
      },
      select: null,
      vacancies: [],
    }
  },
  computed: {
    token() {
      return this.$store.state.utils.token
    },
    experience_types() {
      return this.$store.state.utils.experience_types
    },
    employment_types() {
      return this.$store.state.utils.employment_types
    },
    schedule_types() {
      return this.$store.state.utils.schedule_types
    },
  },
  watch: {
    'searchField.skills'(val) {
      this.sendRequest()
    },
    'searchField.experience_type'(val) {
      this.sendRequest()
    },
    'searchField.search'(val) {
      this.sendRequest()
    },
    searchSkill(val) {
      if (val?.length < 2 || this.isLoading) return

      this.isLoading = true

      this.$api.skillset
        .skillset({ text: val })
        .then((res) => {
          this.entries = res.data.items
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    },
  },
  mounted() {
    if (this.$route.query.text) {
      this.searchField.search = this.$route.query.text
    }
  },
  methods: {
    sendRequest() {
      const data = {
        text: this.searchField.search,
      }

      if (this.searchField.skills !== null)
        data.skill = this.searchField.skills.id
      if (this.searchField.experience_type)
        data.experience_type = this.searchField.experience_type

      this.getVacancies(data)
    },
    getVacancies(data) {
      this.loading = true
      this.$api.vacancies
        .vacancies({ text: this.searchField.search })
        .then((res) => {
          this.vacancies = res.data
          this.loading = false
        })
        .finally(() => (this.loading = false))
    },
  },
}
</script>

<style lang="css"></style>
