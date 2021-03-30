<template>
  <v-app>
    <v-app-bar
      v-if="$vuetify.breakpoint.mdAndUp"
      absolute
      color="white"
      class="app-bar"
      elevate-on-scroll
    >
      <div class="d-row align-center">
        <router-link v-resize="onResize" class="app__logo" to="/"
          ><v-toolbar-title class="logo-font">FindFound</v-toolbar-title>
        </router-link>
        <v-form
          v-if="isSearchHidden"
          @submit.prevent="$router.push(`/search?text=${text}`)"
        >
          <v-text-field
            v-model="text"
            hide-details
            class="ml-10 custom-field"
            dense
            outlined
            prepend-inner-icon="mdi-magnify"
            single-line
          ></v-text-field>
        </v-form>
      </div>

      <v-spacer></v-spacer>

      <v-menu v-if="token" offset-y>
        <template v-slot:activator="{ on }"
          ><v-icon class="menu-icon" v-on="on"
            >mdi-account-circle-outline</v-icon
          >
        </template>
        <v-list>
          <v-list-item to="/cabinet">
            <v-list-item-title>Личный кабинет</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title color="error">Выйти</v-list-item-title>
          </v-list-item>
        </v-list></v-menu
      >
      <v-row v-else class="justify-end" style="gap: 8px">
        <div v-if="$route.path !== '/login'">
          <v-btn to="/login" depressed text>Вход</v-btn>
          <v-btn to="/login?tab=registration" depressed color="primary" text
            >Регистрация</v-btn
          >
        </div>
      </v-row>
    </v-app-bar>

    <v-snackbar :value="snackbar.enabled" :timeout="3000" @input="snackHandle">
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="snackHandle">
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
    <nuxt
      :style="{
        marginTop: isSearchHidden && '64px',
        marginBottom: !$vuetify.breakpoint.mdAndUp && '64px',
      }"
    />
    <v-bottom-navigation
      v-if="!$vuetify.breakpoint.mdAndUp"
      color="primary"
      fixed
      grow
    >
      <v-btn class="app__bottom-button" @click="showExtension = !showExtension">
        <span>Поиск</span>

        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-menu v-if="token" offset-y :nudge-bottom="120">
        <template v-slot:activator="{ on }"
          ><v-btn class="app__bottom-button" v-on="on">
            <span>Меню</span>

            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item to="/">
            <v-list-item-title>Главная</v-list-item-title>
          </v-list-item>
          <v-list-item to="/cabinet">
            <v-list-item-title>Личный кабинет</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title color="error">Выйти</v-list-item-title>
          </v-list-item>
        </v-list></v-menu
      >
      <v-btn
        v-if="!token"
        class="app__bottom-button"
        @click="$router.push(`/login`)"
      >
        <span>Вход</span>

        <v-icon>mdi-login-variant</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-dialog v-model="showExtension">
      <v-card class="pa-1" elevation="0">
        <v-card-title>Поиск</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="$router.push(`/search?text=${text}`)">
            <v-text-field
              v-model="text"
              hide-details
              placeholder="Введите название вакансии"
              append-inner-icon="mdi-magnify"
              single-line
            ></v-text-field> </v-form
        ></v-card-text>
      </v-card>
    </v-dialog>

    <v-footer v-if="$route.path === '/'" padless dark>
      <v-card
        flat
        width="100%"
        tile
        class="black lighten-1 white--text text-center"
      >
        <v-card-text>
          <v-btn
            v-for="item in links"
            :key="item.link"
            class="mx-4 white--text"
            icon
            :href="item.link"
            target="_blank"
          >
            <v-icon size="24px">
              {{ item.icon }}
            </v-icon>
          </v-btn>
        </v-card-text>
        <v-card-text> </v-card-text>
        <v-card-text class="white--text pt-0">
          Поддержка по всем вопросам - support@findfound.me
        </v-card-text>
        <v-card-text>
          <v-btn
            v-for="link in boringLinks"
            :key="link.title"
            text
            :href="link.link"
            target="_blank"
            color="white"
            class="mr-2"
            >{{ link.title }}</v-btn
          ></v-card-text
        >

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>FindFound</strong>
        </v-card-text>
      </v-card>
    </v-footer>
    <v-overlay :value="isBlockedLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import '../pages/Page.css'
export default {
  data() {
    return {
      showExtension: false,
      text: '',
      width: 1920,
      links: [
        { icon: 'mdi-instagram', link: 'https://instagram.com/findfoundme' },
        { icon: 'mdi-telegram', link: 'https://t.me/findfoundme' },
      ],
      boringLinks: [
        {
          title: 'Пользовательское соглашение',
          link:
            'https://sites.google.com/view/findfoundme/%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%BE%D0%B5-%D1%81%D0%BE%D0%B3%D0%BB%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D0%B5',
        },
        {
          title: 'Обработка персональных данных',
          link:
            'https://sites.google.com/view/findfoundme/%D0%BF%D0%BE%D0%BB%D0%B8%D1%82%D0%B8%D0%BA%D0%B0-%D0%B2-%D0%BE%D1%82%D0%BD%D0%BE%D1%88%D0%B5%D0%BD%D0%B8%D0%B8-%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B8-%D0%BF%D0%B5%D1%80%D1%81%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D1%85-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85',
        },
      ],
    }
  },

  computed: {
    footerHeight() {
      return this.$refs.footer ? this.$refs.footer.$el.clientHeight : 0
    },
    token() {
      return localStorage.getItem('user_ff')
    },
    role() {
      return this.$store.state.utils.role
    },
    snackbar() {
      return this.$store.state.processes.snack
    },
    isBlockedLoading() {
      return this.$store.state.processes.isBlockedLoading
    },
    isSearchHidden() {
      const publicRoutes = ['/search', '/search/', '/']
      return !publicRoutes.includes(this.$route.path)
    },
  },
  mounted() {
    if (this.$route.name !== 'login' && this.token) {
      this.$store.dispatch('user/getUserInfo')
    }
    this.onResize()
  },

  methods: {
    snackHandle() {
      this.$store.commit('processes/HIDE_SNACKBAR')
    },
    logout() {
      localStorage.removeItem('user_ff')
      localStorage.removeItem('role_ff')
      this.$router.push('/auth')
      document.location.reload()
    },
    onResize(event) {
      this.width = window.innerWidth
    },
  },
}
</script>

<style lang="css">
.menu-icon {
  font-size: 36px;
}

.custom-field
  .theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
  > .v-input__control
  > .v-input__slot
  fieldset {
  color: #ccc !important;
}

.app__bottom-button {
  height: 100%;
}

.app__logo {
  text-decoration: none;
  color: black;
}

.app__logo .logo-font {
  font-size: 34px;
  font-weight: 700;
}

.v-toolbar__extension {
  border-bottom: 1px solid #eee;
  margin-bottom: 8px;
}
.app-bar {
  box-shadow: inset 0px 0.5px 0.5px rgba(255, 255, 255, 0.5),
    inset 0px -0.5px 0px #b7b4b7, inset 0px -1px 0px rgba(183, 180, 183, 0.3) !important;
}
</style>
