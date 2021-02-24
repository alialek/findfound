<template>
  <div class="justify-center p-relative d-row home">
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

    <v-col class="main pd-unset">
      <div class="main__search d-col pd-unset">
        <h1 align="center" class="logo-font">
          FindFound
          <span class="text-overline">beta</span>
        </h1>
        <v-row class="justify-center align-center">
          <h1
            style="
              font-weight: 500;
              text-align: center;
              font-size: 50px !important;
            "
            class="my-4 logo-font mr-4"
          >
            поможет найти
          </h1>
          <v-form
            style="width: 90%; max-width: 400px"
            @submit.prevent="$router.push(`search?text=${search}`)"
          >
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
              min
              placeholder="Поиск вакансий"
              outlined
            ></v-autocomplete>
          </v-form>
        </v-row>
        <h1
          style="
            font-weight: 500;
            text-align: center;
            font-size: 50px !important;
          "
          class="logo-font"
        >
          интересный проект
        </h1>
      </div>
      <div
        style="
          min-height: 381px;
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
        "
        class="d-col main__slide"
      >
        <h3 class="font-weight-regular mb-2" style="text-align: center">
          Например, среди новых объявлений:
        </h3>
        <v-slide-group v-if="!loading" show-arrows>
          <v-slide-item v-for="vacancy in vacancies" :key="vacancy.id">
            <t-card
              :id="vacancy.id"
              :title="vacancy.name"
              :company="vacancy.company_name"
              :logo="vacancy.company_logo"
              :skills="vacancy.skills"
              :company-id="vacancy.company_id"
            /> </v-slide-item
        ></v-slide-group>

        <v-row v-if="loading" class="justify-center">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-row>
      </div>
      <landing-page />
    </v-col>
  </div>
</template>

<script>
import TCard from '@/atoms/TCard.vue'
import LandingPage from '~/components/IndexPage/LandingPage.vue'
export default {
  name: 'Main',
  components: { TCard, LandingPage },
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
        this.vacancies = res.data.slice(0, 6)
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
.main__search {
  margin-top: 200px;
}
.main__slides {
  margin-top: 24px;
}
.main__slides::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
</style>
