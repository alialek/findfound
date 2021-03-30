<template>
  <v-card>
    <v-toolbar rounded="0" dark elevation="0" color="primary">
      <v-btn icon dark @click="$emit('closeVacancyEditor')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Редактирование</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-toolbar-items>
        <v-btn dark text @click="updateVacancy"> Готово </v-btn>
      </v-toolbar-items> -->
    </v-toolbar>
    <div v-if="vacancy.name">
      <div class="d-row">
        <v-col cols="12" class="col-md-6">
          <form-field icon="mdi-text-account" title="Заголовок">
            <v-text-field
              v-model="vacancy.name"
              :filled="true"
              placeholder="Название вакансии"
              dense
            ></v-text-field>
          </form-field>
          <form-field icon="mdi-text" title="О вакансии">
            <v-text-field
              v-model="vacancy.short_description"
              :filled="true"
              dense
              placeholder="Краткое описание"
            ></v-text-field>
          </form-field>

          <form-field icon="mdi-briefcase-outline" title="Опыт работы">
            <v-select
              v-model="vacancy.experience_type"
              item-text="name"
              item-value="id"
              placeholder="Требуемый опыт работы"
              :items="experience_types"
              dense
              :filled="true"
            ></v-select>
          </form-field>

          <form-field icon="mdi-office-building-marker" title="Тип занятости">
            <v-select
              v-model="vacancy.employment_type"
              item-text="name"
              item-value="id"
              placeholder="Выберите занятость"
              :items="employment_types"
              dense
              :filled="true"
            ></v-select>
          </form-field>
        </v-col>
        <v-col cols="12" class="col-md-6">
          <form-field icon="mdi-currency-usd" title="Оплата труда">
            <v-checkbox
              v-model="salaryEnabled"
              class="custom-checkbox"
              dense
            ></v-checkbox>
          </form-field>
          <form-field
            v-if="salaryEnabled"
            icon="mdi-cash-multiple"
            title="Зарплата"
          >
            <v-text-field v-model="vacancy.salary" filled dense></v-text-field>
          </form-field>
          <form-field icon="mdi-circle-slice-1" title="Условия">
            <v-text-field
              v-model="vacancy.partnership"
              placeholder="Зарплата, доля в проекте..."
              :filled="true"
              dense
            ></v-text-field>
          </form-field>

          <form-field icon="mdi-calendar-clock" title="График работы">
            <v-select
              v-model="vacancy.schedule_type"
              item-text="name"
              placeholder="Выберите график"
              item-value="id"
              :items="schedule_types"
              dense
              :filled="true"
            ></v-select>
          </form-field>
        </v-col>
      </div>
      <v-col cols="12">
        <form-field
          icon="mdi-badge-account-horizontal-outline"
          title="Навыки"
          max-width="100%"
        >
          <v-combobox
            v-model="vacancy.skills"
            :items="entries"
            :loading="isLoading"
            :search-input.sync="search"
            hide-selected
            small-chips
            multiple
            filled
            dense
            item-text="text"
            item-value="id"
            append-icon="mdi-magnify"
            placeholder="Начните вводить..."
            :delimiters="[',']"
            return-object
            style="max-width: 650px"
            @change="search = ''"
            @input="addSkill"
          >
            <template v-slot:selection></template>
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title v-if="search">
                    Ничего не найдено по запросу "<strong>{{ search }}</strong
                    >".<br />
                    Нажмите <kbd>enter</kbd>, чтобы добавить новый навык
                  </v-list-item-title>
                  <v-list-item-title v-else> Введите навык </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template></v-combobox
          >
          <v-chip
            v-for="(skill, i) in vacancy.skills"
            :key="i"
            small
            close
            class="mt-2 mr-2"
            @click:close="removeSkill(skill)"
            >{{ skill.text }}</v-chip
          >
        </form-field>
        <form-field icon="mdi-text-subject" title="Описание" max-width="100%">
          <div class="editorx_body">
            <div id="codex-editor" />
          </div>
        </form-field>
      </v-col>
      <v-col
        ><v-btn color="success" class="my-8" depressed @click="save">
          Сохранить
        </v-btn></v-col
      >
    </div>
  </v-card>
</template>

<script>
import FormField from '@/atoms/Form-field.vue'
import EditorJS from '@editorjs/editorjs'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
export default {
  name: 'VacancyEditor',
  components: { FormField },
  props: {
    vacancyId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      isLoading: false,
      vacancy: {},
      salaryEnabled: false,
      entries: [],
      search: '',
    }
  },
  computed: {
    experience_types() {
      return this.$store.state.utils.experience_types
    },
    employment_types() {
      return this.$store.state.utils.employment_types
    },
    schedule_types() {
      return this.$store.state.utils.schedule_types
    },
  },
  watch: {
    vacancy: {
      handler() {
        if (this.vacancy.salary) {
          this.salaryEnabled = true
        }
        if (this.vacancy.name) {
          this.vacancy.employment_type.id = +this.vacancy.employment_type.id
          this.vacancy.schedule_type.id = +this.vacancy.schedule_type.id
        }
      },
      immediate: true,
    },
    vacancyId: {
      handler() {
        this.$api.vacancies
          .getVacancyById(this.vacancyId)
          .then((res) => {
            this.vacancy = res.data
            setTimeout(() => {
              this.myEditor()
            }, 300)
          })
          .finally(() => this.$store.commit('processes/LOADING_STOP'))
      },
      immediate: true,
    },
    search(val) {
      if (val === null || val?.length < 2 || this.isLoading) return

      this.isLoading = true

      this.$api.skillset
        .skillset({ text: val })
        .then((res) => {
          this.entries = res.data.items
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    },
  },
  methods: {
    addSkill(items) {
      this.vacancy.skills = items.map((item) =>
        typeof item === 'object' ? item : { text: item }
      )
    },
    removeSkill(item) {
      this.vacancy.skills = this.vacancy.skills.filter(
        (skill) => skill.text !== item.text
      )
    },
    save() {
      window.editor.save().then((text) => {
        if (!this.salaryEnabled) this.vacancy.salary = 0
        const data = {
          ...this.vacancy,
          description: JSON.stringify(text),
          schedule_type: this.vacancy.schedule_type.id,
          employment_type: this.vacancy.employment_type.id,
          experience_type: this.vacancy.experience_type.id,
        }
        this.$api.vacancies
          .updateVacancy(data, this.vacancyId)
          .then((res) => {
            this.vacancyStep = 1
            this.$store.commit(
              'processes/SET_SUCCESS',
              'Вакансия отредактирована'
            )
            this.$emit('closeVacancyEditor')
            this.$emit('refresh')
          })
          .catch((err) => {
            this.$store.commit(
              'processes/SET_ERROR',
              err.response.status === 400
                ? err.response.data
                : 'Непредвиденная шибка'
            )
          })
      })
    },
    myEditor() {
      window.editor = new EditorJS({
        holder: 'codex-editor',
        autofocus: false,
        minHeight: 30,
        initialBlock: 'paragraph',
        tools: {
          list: {
            class: List,
          },
          paragraph: {
            class: Paragraph,
            config: {
              placeholder: '.',
            },
          },
        },
        data: this.vacancy?.description
          ? JSON.parse(this.vacancy.description)
          : {},
        onReady() {},
        onChange() {},
      })
    },
  },
}
</script>

<style></style>
