<template>
  <div class="participant-card d-col mt-6 mx-2 team-card">
    <v-icon class="mb-4" size="56">mdi-face-profile</v-icon>

    <h4 class="participant-card__title">{{ fullName }}</h4>
    <v-row class="justify-center">
      <v-chip
        v-for="(p, i) in position"
        :key="i"
        dense
        color="primary"
        class="participant-card__poisition mb-2 mx-2"
        >{{ p }}</v-chip
      >
    </v-row>
    <p class="participant-card__description">{{ description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    position: {
      type: Array,
      default: () => [],
    },
    fullName: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    photo: {
      type: String,
      default: '',
    },
  },
}
</script>

<style></style>
