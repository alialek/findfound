<template>
  <div class="mx-4 header">
    <div class="header__container">
      <div v-if="project.name">
        <v-icon v-if="project.logo === ''">mdi-domain</v-icon>
        <v-img v-else class="project__logo" :src="setLogo(project.logo)" />
        <h1 class="vacancy__title mt-6">
          {{ project.name }}
        </h1>
        <p class="small-header mt-0">Проект</p>
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
      <project-tabs
        v-if="project.hasOwnProperty('id')"
        :project="project"
        :responses="responses"
        @refresh="refresh"
      />
    </div>
  </div>
</template>

<script>
import './Page.css'
import ProjectTabs from '~/components/ProjectPage/Project-Tabs.vue'

export default {
  name: 'Project',
  components: {
    ProjectTabs,
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
    store.dispatch('project/getProject', query.id)
    store.dispatch('project/getInvitations', { id: query.id })
  },
  computed: {
    project() {
      return this.$store.state.project.project
    },
    responses() {
      return this.$store.state.project.responses
    },
  },
  methods: {
    setLogo(logo) {
      return logo.includes('https://')
        ? logo
        : `https://findfoundbucket.s3.amazonaws.com/media/${logo}`
    },
    refresh() {
      this.$store.dispatch('project/getProject', this.$route.query.id)
    },
  },
}
</script>

<style lang="css">
.project__logo .v-image__image {
  background-position: center left !important;
}

.header__container .v-icon {
  font-size: 56px;
}

.project__logo {
  width: 70px;
  height: 70px;
  border-radius: 100px;
}
</style>
