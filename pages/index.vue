<template>
  <div class="justify-center p-relative mx-3 d-row home">
    <v-menu v-if="token" offset-y>
      <template v-slot:activator="{ on }"
        ><v-icon
          class="p-absolute"
          style="top: 16px; right: 16px; font-size: 32px"
          v-on="on"
          >mdi-account-circle-outline</v-icon
        >
      </template>
      <v-list>
        <v-list-item to="/cabinet">
          <v-list-item-title>Личный кабинет</v-list-item-title>
        </v-list-item>
        <v-list-item color="error" @click="logout">
          <v-list-item-title>Выйти</v-list-item-title>
        </v-list-item>
      </v-list></v-menu
    >

    <v-btn
      v-else
      class="p-absolute"
      style="top: 16px; right: 16px"
      to="/login"
      depressed
      text
      >Вход</v-btn
    >

    <v-col class="main pd-unset justify-space-evenly">
      <div class="main__search d-col pd-unset">
        <h1 align="center" class="my-9 logo-font">FindFound</h1>
        <v-form @submit="$router.push(`search?text=${search}`)">
          <v-autocomplete
            v-model="select"
            :items="items"
            :search-input.sync="search"
            cache-items
            class="mx-auto search"
            flat
            rounded
            hide-no-data
            hide-details
            placeholder="Поиск вакансий"
            outlined
          ></v-autocomplete>
        </v-form>
      </div>
      <div style="min-height: 381px" class="d-col main__slide">
        <div
          v-if="!loading"
          style="flex-wrap: nowrap"
          class="main__slides d-row"
        >
          <t-card
            v-for="vacancy in vacancies"
            :id="vacancy.id"
            :key="vacancy.id"
            :title="vacancy.name"
            :company="vacancy.company_name"
            :description="vacancy.short_description"
            :logo="vacancy.company_logo"
            :skills="vacancy.skills"
          />
        </div>
        <v-row v-if="loading" class="justify-center">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-row>
      </div>
    </v-col>
  </div>
</template>

<script>
import TCard from '@/atoms/TCard.vue'
export default {
  name: 'Main',
  components: { TCard },
  data() {
    return {
      loading: false,
      items: [],
      search: null,
      select: null,
      vacancies: [],
    }
  },
  computed: {
    token() {
      return this.$store.state.utils.token
    },
  },
  mounted() {
    this.loading = true
    this.$api.vacancies
      .getVacancies()
      .then((res) => {
        this.vacancies = res.data.slice(0, 3)
      })
      .finally(() => {
        this.loading = false
      })
    this.$store.dispatch('utils/getToken')
    this.$store.dispatch('utils/getRole')
  },
  methods: {
    logout() {
      localStorage.removeItem('user_ff')
      localStorage.removeItem('role_ff')
      document.location.reload()
    },
  },
}
</script>

<style lang="css">
.main__slides {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  overflow-x: scroll;
  padding-top: 20px;
}
.main__slides::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
</style>
