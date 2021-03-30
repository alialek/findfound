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
          class="user__avatar"
          @click="selectFile()"
          >mdi-camera</v-icon
        >
        <v-img
          v-else
          class="user__avatar"
          :src="`https://findfoundbucket.s3.amazonaws.com/media/${user.photo}`"
          @click="selectFile()"
        />
        <h1 class="mt-6">
          {{ user.first_name + ' ' + user.last_name }}
        </h1>
        <p class="small-header mt-0">Профиль</p>
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
  asyncData({ store }) {
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

<style scoped>
.user__avatar {
  width: 90px;
  height: 90px;
  border-radius: 100px;
  cursor: pointer;
  font-size: 64px;
}
</style>
