<template>
  <div
    :class="`about-section__info ${
      column ? `` : `d-row nowrap`
    } align-baseline`"
  >
    <div>
      <b class="about-section__desc"
        ><v-icon>{{ icon }}</v-icon> {{ title }}</b
      >
    </div>
    <div
      :style="{
        width: getWidth(),
      }"
      :class="`${column ? `` : `about-section__field`}`"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    column: {
      default: false,
      type: Boolean,
    },
    maxWidth: {
      default: 'unset',
      type: String,
    },
    title: {
      default: '',
      type: String,
    },
    icon: {
      default: '',
      type: String,
    },
  },
  methods: {
    getWidth() {
      if (this.maxWidth === 'unset') {
        if (this.$vuetify.breakpoint.mdAndUp) return '230px'
        return '100%'
      }
      return this.maxWidth
    },
  },
}
</script>

<style scoped>
.about-section__info {
  padding-left: 8px;
  padding-top: 16px;
  padding-right: 16px;
}
.about-section__field {
  width: 100%;
}

.about-section__desc {
  margin-right: 16px;
  display: block;
  min-width: 150px;
  padding: 6px 0;
  text-align: left;
  color: #757575;
}

@media (max-width: 600px) {
  .about-section__info {
    flex-wrap: wrap !important;
  }
}
</style>
