<template>
  <v-app>
    <v-app-bar
      v-if="$vuetify.breakpoint.mdAndUp"
      absolute
      color="white"
      style="
        box-shadow: inset 0px 0.5px 0.5px rgba(255, 255, 255, 0.5),
          inset 0px -0.5px 0px #b7b4b7,
          inset 0px -1px 0px rgba(183, 180, 183, 0.3) !important;
      "
      elevate-on-scroll
    >
      <div class="d-row align-center">
        <router-link
          v-resize="onResize"
          style="text-decoration: none; color: black"
          to="/"
          ><v-toolbar-title
            class="logo-font"
            style="font-size: 34px !important; font-weight: 700"
            >FindFound</v-toolbar-title
          >
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
          ><v-icon style="font-size: 36px" class="menu-icon" v-on="on"
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

    <v-snackbar v-model="snackbar.enabled" :timeout="3000">
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="primary"
          text
          v-bind="attrs"
          @click="snackbar.enabled = false"
        >
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
    <nuxt
      :style="{
        marginTop: isSearchHidden ? '64px' : '',
        marginBottom: $vuetify.breakpoint.mdAndUp ? '' : '64px',
      }"
    />
    <v-bottom-navigation
      v-if="!$vuetify.breakpoint.mdAndUp"
      color="primary"
      fixed
      grow
    >
      <v-btn @click="showExtension = !showExtension">
        <span>Поиск</span>

        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-menu v-if="token" offset-y :nudge-bottom="120">
        <template v-slot:activator="{ on }"
          ><v-btn v-on="on">
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
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      showExtension: false,
      text: '',
      width: 1920,
    }
  },

  computed: {
    token() {
      return localStorage.getItem('user_ff')
    },
    role() {
      return this.$store.state.utils.role
    },
    snackbar() {
      return this.$store.state.processes.snack
    },
    isSearchHidden() {
      const publicRoutes = ['/search', '/']
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
  font-size: 32px;
}

.custom-field
  .theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
  > .v-input__control
  > .v-input__slot
  fieldset {
  color: #ccc !important;
}

.v-toolbar__extension {
  border-bottom: 1px solid #eee;
  margin-bottom: 8px;
}
</style>
