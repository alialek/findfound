<template>
  <div class="justify-center d-row">
    <v-col styclass="main pd-unset justify-space-evenly ">
      <div class="mx-auto main__search d-col pd-unset">
        <v-text-field
          v-model="searchField.search"
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
          @input="handleSearchInput"
        ></v-text-field>
        <v-row>
          <v-col cols="12" md="3">
            <v-combobox
              v-model="searchField.skill"
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
              @change="searchSkill = ''"
            ></v-combobox>
          </v-col>
          <v-col cols="12" md="3"
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
          <v-col cols="12" md="3"
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
          <v-col cols="12" md="3"
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
            <div class="d-row justify-space-around">
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
              <v-col class="search__placeholder">
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
      timeout: null,
      loading: false,
      items: [],
      searchField: {
        search: '',
        experience_type: '',
        schedule_type: '',
        employment_type: '',
        skill: null,
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
    'searchField.skill'(val) {
      this.sendRequest()
    },
    'searchField.experience_type'(val) {
      this.sendRequest()
    },
    'searchField.employment_type'(val) {
      this.sendRequest()
    },
    'searchField.schedule_type'(val) {
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
    } else {
      this.sendRequest()
    }
  },
  methods: {
    handleSearchInput(e) {
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.sendRequest()
      }, 300)
    },
    sendRequest() {
      const data = {
        text: this.searchField.search || '',
      }
      console.log(this.searchField)
      if (this.searchField.skill) data.skill = this.searchField.skill
      if (this.searchField.experience_type)
        data.experience_type = this.searchField.experience_type
      if (this.searchField.employment_type)
        data.employment_type = this.searchField.employment_type
      if (this.searchField.schedule_type)
        data.schedule_type = this.searchField.schedule_type
      this.getVacancies(data)
    },
    getVacancies(data) {
      this.loading = true
      this.$api.vacancies
        .vacancies(data)
        .then((res) => {
          this.vacancies = res.data
          this.loading = false
        })
        .finally(() => (this.loading = false))
    },
  },
}
</script>

<style lang="css" scope>
.v-text-field__details {
  display: none !important;
}
.main__search {
  margin-top: 56px;
  width: 90%;
}

.main__search .searchField {
  width: 100%;
}
.search__placeholder {
  text-align: center;
}
</style>
