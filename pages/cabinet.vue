<template>
  <div class="mx-4">
    <div style="margin-top: 100px">
      <div v-if="user.first_name">
        <v-icon style="font-size: 56px">mdi-account-circle</v-icon>
        <h1 class="vacancy__title" style="margin-top: 24px">
          {{ user.first_name + ' ' + user.last_name }}
        </h1>
      </div>
      <div v-else>
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
    </div>

    <div>
      <student
        v-if="user.hasOwnProperty('form')"
        :user="user"
        @refresh="getInfo"
      />
    </div>
  </div>
</template>

<script>
import Student from '@/components/Student'

export default {
  name: 'Cabinet',
  components: {
    Student,
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
  }) {
    $api.users.getUserInfo().then((res) => {
      store.commit('user/setUser', res.data)
    })
  },
  computed: {
    user() {
      return this.$store.state.user.info
    },
  },
  methods: {
    getInfo() {
      this.$api.users.getUserInfo().then((res) => {
        this.$store.commit('user/setUser', res.data)
      })
    },
  },
}
</script>
