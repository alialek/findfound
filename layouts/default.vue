<template>
  <v-app>
    <v-app-bar
      v-if="isAppBarHidden"
      absolute
      color="white"
      style="
        box-shadow: inset 0px 0.5px 0.5px rgba(255, 255, 255, 0.5),
          inset 0px -0.5px 0px #b7b4b7,
          inset 0px -1px 0px rgba(183, 180, 183, 0.3) !important;
      "
      elevate-on-scroll
    >
      <router-link
        v-resize="onResize"
        style="text-decoration: none; color: black"
        to="/"
        ><v-toolbar-title
          v-if="width > 800"
          class="logo-font"
          style="font-size: 34px !important; font-weight: 700"
          >FindFound</v-toolbar-title
        >
        <v-toolbar-title
          v-if="width <= 800"
          class="logo-font"
          style="font-size: 34px !important; font-weight: 700"
          >FF</v-toolbar-title
        ></router-link
      >
      <v-form
        v-if="this.$route.path !== '/search'"
        @submit="$router.push(`/search?text=${text}`)"
      >
        <v-text-field
          v-if="width > 800"
          v-model="text"
          hide-details
          class="ml-10"
          dense
          outlined
          rounded
          prepend-inner-icon="mdi-magnify"
          single-line
        ></v-text-field>
        <v-text-field
          v-if="width <= 800"
          v-model="text"
          hide-details
          class="ml-4"
          dense
          full-width
          outlined
          prepend-inner-icon="mdi-magnify"
          single-line
        ></v-text-field>
      </v-form>

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
          <v-list-item color="error" @click="logout">
            <v-list-item-title>Выйти</v-list-item-title>
          </v-list-item>
        </v-list></v-menu
      >
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
    <nuxt :style="{ marginTop: isAppBarHidden ? '64px' : '' }" />
  </v-app>
</template>

<script>
export default {
  data() {
    return {
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
    isAppBarHidden() {
      const publicRoutes = ['/', '/login']
      return !publicRoutes.includes(this.$route.path)
    },
  },
  mounted() {
    this.$store.dispatch('user/getUserInfo')
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
</style>
