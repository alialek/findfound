<template>
  <div class="about-section__info d-row align-baseline">
    <b class="about-section__desc"
      ><v-icon>{{ icon }}</v-icon> {{ title }}</b
    >
    <div class="about-section__field">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: '',
      type: String,
    },
    icon: {
      default: '',
      type: String,
    },
  },
}
</script>

<style scoped>
.about-section__info {
  padding-left: 8px;
  padding-top: 8px;
}
.about-section__field {
  width: 100%;
  max-width: 200px;
}

.about-section__desc {
  margin-right: 16px;
  display: block;
  min-width: 148px;
  text-align: left;
  color: #757575;
}
</style>
