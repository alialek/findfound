<template>
  <v-card>
    <v-card-title>Изменить логотип </v-card-title>
    <v-card-text>
      <form-field icon="mdi-camera" title="Логотип">
        <v-file-input
          v-model="logo"
          accept="image/png, image/jpeg, image/bmp"
          prepend-icon=""
          dense
          filled
          @change="uploadLogo"
          placeholder="Выберите файл"
        >
          <template v-slot:selection="{ text }">
            <v-chip small label color="primary">
              {{ text }}
            </v-chip>
          </template>
        </v-file-input>
      </form-field>
    </v-card-text>
  </v-card>
</template>

<script>
import FormField from '@/atoms/Form-field.vue'
export default {
  name: 'ProjectEditor',
  components: { FormField },
  props: {
    projectId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      isLoading: false,

      logo: null,
    }
  },
  methods: {
    uploadLogo() {
      console.log(this.logo)
      if (this.logo)
        this.$emit('updateProjectLogo', this.projectId, this.logo, true)
    },
  },
}
</script>

<style></style>
