<template>
  <div class="mx-4">
    <div style="margin-top: 100px">
      <div v-if="project.name">
        <div
          alt="logo"
          class="team-card__logo"
          :style="{ backgroundImage: `url(${project.logo})` }"
        />
        <h1 class="vacancy__title" style="margin-top: 24px">
          {{ project.name }}
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
      <project-tabs
        v-if="project.hasOwnProperty('id')"
        :project="project"
        :responses="invitations"
      />
    </div>
  </div>
</template>

<script>
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
    store.dispatch('project/getProject', { me: 'creator' })
  },
  computed: {
    project() {
      return this.$store.state.project.project
    },
    responses() {
      return this.$store.state.project.responses
    },
  },
  methods: {},
}
</script>
