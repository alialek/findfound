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
      <!-- Копипаста с лендинга -->
      <div class="np ng ue uu">
        <main class="rt">
          <section class="fa">
            <div class="fu fg cz ha fh fs" aria-hidden="true">
              <svg
                width="1360"
                height="578"
                viewBox="0 0 1360 578"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="illustration-01"
                    x1="50%"
                    y1="0%"
                    x2="50%"
                    y2="100%"
                  >
                    <stop stop-color="#FFF" offset="0%"></stop>
                    <stop stop-color="#EAEAEA" offset="77.402%"></stop>
                    <stop stop-color="#DFDFDF" offset="100%"></stop>
                  </linearGradient>
                </defs>
                <g fill="url(#illustration-01)" fill-rule="evenodd">
                  <circle cx="1232" cy="128" r="128"></circle>
                  <circle cx="155" cy="443" r="64"></circle>
                </g>
              </svg>
            </div>
            <div class="oq pj mx-auto">
              <div class="fe aw vg vm">
                <div class="aw vd">
                  <h1 class="in lt db ra is ce sm">
                    Найди команду на<br />
                    <h2 class="w ln tl tv tw">FindFound.me</h2>
                    <span
                      style="letter-spacing: 2px"
                      class="lt d-none d-md-block font-weight-regular rz la sj"
                      >Единая база стартапов и талантов</span
                    >
                  </h1>

                  <div class="i_ mt-8">
                    <v-form
                      style="width: 100%"
                      class="d-row"
                      @submit.prevent="$router.push(`search?text=${search}`)"
                    >
                      <v-text-field
                        v-model="search"
                        cache-items
                        class="mx-auto search"
                        flat
                        hide-no-data
                        hide-details
                        min
                        placeholder="Поиск вакансий в стартап"
                        filled
                      >
                        <template v-slot:append-outer>
                          <v-btn
                            color="primary"
                            depressed
                            x-large
                            @click="$router.push(`search?text=${search}`)"
                            >Поиск</v-btn
                          >
                        </template>
                      </v-text-field>
                    </v-form>
                    <div class="d-col main__slide">
                      <h2 class="h2 sm lt mt-12">Стартапы ищут:</h2>
                      <v-slide-group v-if="!loading" show-arrows>
                        <v-slide-item
                          v-for="vacancy in vacancies"
                          :key="vacancy.id"
                        >
                          <t-card
                            :id="vacancy.id"
                            class="px-2"
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
                  </div>
                </div>
              </div>
            </div>
          </section>
          <landing-sections />
        </main>
      </div>
    </v-col>
  </div>
</template>

<script>
import TCard from '@/atoms/TCard.vue'
import LandingSections from '../components/IndexPage/LandingSections'
export default {
  name: 'Main',
  components: { TCard, LandingSections },
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

<style lang="scss" scoped>
@import url('../components/IndexPage/LandingPage.css');
.main__search {
  margin-top: 200px;
}
.main__slide {
  min-height: 381px;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
}
.main__slides {
  margin-top: 24px;
}
.main__slides::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

.search .v-btn {
  height: 56px;
}
</style>
