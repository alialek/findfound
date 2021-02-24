<template>
  <div class="mx-4 header">
    <div class="header__container">
      <input
        ref="file"
        type="file"
        accept="image/*"
        hidden
        @change="uploadPhoto"
      />
      <div v-if="user.first_name">
        <v-icon
          v-if="user.photo === ''"
          style="font-size: 64px; cursor: pointer"
          @click="selectFile()"
          >mdi-camera</v-icon
        >
        <v-img
          v-else
          style="width: 90px; height: 90px; border-radius: 100px"
          :src="`https://findfoundbucket.s3.amazonaws.com/media/${user.photo}`"
        />
        <h1 style="margin-top: 24px">
          {{ user.first_name + ' ' + user.last_name }}
        </h1>
        <p class="small-header" style="margin-top: 0px">Профиль</p>
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
      <cabinet-view
        v-if="user.hasOwnProperty('form')"
        :user="user"
        :responses="responses"
        @refresh="getInfo"
      />
    </div>
  </div>
</template>

<script>
import CabinetView from '@/components/CabinetPage/CabinetView'
import './Page.css'

export default {
  name: 'Cabinet',
  components: {
    CabinetView,
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
    store.dispatch('user/getUserInfo')
    store.dispatch('user/getResponses')
    store.dispatch('utils/getConstants')
  },
  computed: {
    user() {
      return this.$store.state.user.info
    },
    responses() {
      return this.$store.state.user.responses
    },
  },
  methods: {
    selectFile() {
      const fileInputElement = this.$refs.file
      fileInputElement.click()

      // Do something with chosen file
    },
    uploadPhoto(file) {
      const formData = new FormData()
      formData.append('file', this.$refs.file.files[0])
      this.$api.users
        .uploadUserPhoto(this.user.id, formData)
        .then((res) => {
          this.getInfo()
          this.$store.commit('processes/SET_SUCCESS', 'Фото загружено')
        })
        .catch(() => {
          this.$store.commit(
            'processes/SET_SUCCESS',
            'Не поддерживаемый формат'
          )
        })
    },
    getInfo() {
      this.$api.users.getUserInfo().then((res) => {
        this.$store.commit('user/setUser', res.data)
      })
    },
  },
}
</script>
