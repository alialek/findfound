<template>
  <v-col class="justify-center placeholder align-center">
    <img :src="emoji" class="placeholder__emoji" alt="Эмодзи" />
    <p class="placeholder__text">{{ text }}</p>
  </v-col>
</template>

<script>
import './Placeholder.css'
export default {
  name: 'Placeholder',
  props: {
    emoji: {
      default: '/img/e_pensive.png',
      type: String,
    },
    text: {
      default: 'Произошла ошибка',
      type: String,
    },
  },
}
</script>

<style></style>
