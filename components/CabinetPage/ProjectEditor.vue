<template>
  <v-card>
    <v-toolbar
      style="width: 100%"
      absolute
      rounded="0"
      dark
      elevation="0"
      color="primary"
    >
      <v-btn icon dark @click="$emit('closeProjectEditor')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Редактирование</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark text @click="updateProject">Готово</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <div v-if="!isLoading" style="padding: 60px 16px 16px 16px">
      <div class="d-row">
        <v-col cols="12" class="col-md-6">
          <form-field icon="mdi-text" title="Название*">
            <v-text-field
              v-model="project.name"
              :rules="[rules.required]"
              placeholder="FindFound"
              filled
              dense
            ></v-text-field>
          </form-field>
          <form-field title="Город" icon="mdi-city">
            <v-combobox
              v-model="project.city"
              :items="cities"
              :search-input="searchCity"
              hide-no-data
              hide-selected
              item-text="name"
              item-value="id"
              filled
              return-object
              dense
              placeholder="Начните вводить название"
            ></v-combobox>
          </form-field>

          <form-field icon="mdi-ladder" title="Стадия*">
            <v-select
              v-model="project.state"
              :rules="[rules.required]"
              :items="states"
              dense
              placeholder="Выберите стадию проекта"
              filled
            ></v-select>
          </form-field>

          <form-field icon="mdi-target" title="Отрасль*">
            <v-text-field
              v-model="project.subject"
              :rules="[rules.required]"
              filled
              placeholder="Например, IT"
              dense
            ></v-text-field>
          </form-field>
        </v-col>
        <v-col cols="12" class="col-md-6">
          <form-field icon="mdi-semantic-web" title="Описание*">
            <v-textarea
              v-model="project.description"
              :rules="[rules.required]"
              filled
              placeholder="Опишите идею проекта и вашу миссию"
              dense
            ></v-textarea>
          </form-field>
        </v-col>
        <v-col class="form-grid">
          <form-field
            v-for="contact in filteredContacts"
            :key="contact.id"
            :title="contact.name"
            :icon="contact.icon"
          >
            <v-text-field
              v-model="project[contact.id]"
              filled
              dense
              placeholder="Введите ссылку"
            ></v-text-field>
          </form-field>
        </v-col>
      </div>

      <br />
      <v-btn
        class="mt-2 mb-4"
        color="success"
        :disabled="!checkRequired"
        large
        depressed
        @click="sendProject"
        >Обновить</v-btn
      >
    </div>
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
      searchCity: null,
      filteredContacts: [],
      logo: null,
      project: {
        name: '',
        state: '',
        subject: '',
        description: '',
        city: 2,
        roles: [],
      },
      states: ['Идея', 'Готовится MVP', 'MVP готов', 'Pre-seed'],
      requiredProjectFields: ['name', 'description', 'state', 'subject'],
    }
  },
  computed: {
    cities() {
      return this.$store.state.utils.cities
    },
    checkRequired() {
      return this.requiredProjectFields.reduce(
        (acc, val) => acc && Boolean(this.project[val]),
        true
      )
    },
    rules() {
      return this.$store.state.utils.rules
    },
  },
  watch: {
    projectId: {
      handler() {
        this.isLoading = true
        this.$api.projects
          .getProjectById(this.projectId)
          .then((res) => {
            this.project = res.data
            this.isLoading = false
          })
          .finally(() => this.$store.commit('processes/LOADING_STOP'))
      },
      immediate: true,
    },
  },
  mounted() {
    this.filteredContacts = this.$store.state.utils.contacts
      .filter(
        (contact) =>
          contact.id !== 'linkedin' &&
          contact.id !== 'telegram' &&
          contact.id !== 'github'
      )
      .slice()
  },
  methods: {
    sendProject() {
      const data = {
        ...this.project,
        city: this.project.city.id,
        roles: [],
      }

      this.$api.projects
        .updateProject(data, this.projectId)
        .then((res) => {
          this.$emit('refresh')
          this.updateProject()
          this.$store.commit('processes/SET_SUCCESS', 'Проект обновлен')
        })
        .catch((err) => {
          this.$store.commit('processes/SET_ERROR', err.response.data)
        })
    },
    updateProject() {
      this.$emit('closeProjectEditor')
    },
  },
}
</script>

<style></style>
