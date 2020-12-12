<template>
  <div class="d-row justify-center">
    <div class="mt-4">
      <v-col style="max-width: 900px">
        <span class="mb-2 vacancy__field">Заголовок вакансии</span>
        <v-text-field
          v-model="vacancy.name"
          outlined
          style="font-size: 26px"
          placeholder="Заголовок"
        />

        <span class="mb-2 vacancy__field">Краткое описание (140 символов)</span>
        <v-text-field
          v-model="vacancy.short_description"
          outlined
          max-length="140"
          placeholder="Описание"
        />

        <span class="mb-2 vacancy__field">Условия работы</span>
        <v-row class="pd-unset">
          <v-col cols="12" class="col-md-4">
            <v-combobox
              v-model="vacancy.experience_type"
              item-text="name"
              item-value="id"
              :items="experience_types"
              outlined
              small-chips
              class="custom-combo"
              label="Требуемый опыт"
            >
            </v-combobox
          ></v-col>
          <v-col cols="12" class="col-md-4">
            <v-combobox
              v-model="vacancy.employment_type"
              :items="employment_types"
              outlined
              item-text="name"
              item-value="id"
              small-chips
              label="Тип занятости"
          /></v-col>
          <v-col cols="12" class="col-md-4">
            <v-combobox
              v-model="vacancy.schedule_type"
              :items="schedule_types"
              outlined
              item-text="name"
              item-value="id"
              small-chips
              label="График работы"
          /></v-col>
        </v-row>
        <v-col class="pd-unset" cols="4">
          <span class="mb-2 vacancy__field">Зарплата</span>
          <v-text-field
            v-model="vacancy.salary"
            outlined
            max-length="140"
            width="200"
            placeholder="Зарплата"
          />
        </v-col>
        <span class="mb-2 resume__field">Рекомендуемые онлайн-курсы </span>
        <div
          v-for="(course, i) in vacancy.courses"
          :key="i + 'course'"
          class="d-row"
        >
          <v-text-field
            v-model="course.name"
            label="Название курса"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="course.link"
            label="Ссылка"
            outlined
          ></v-text-field>
        </div>
        <span class="mb-2 vacancy__field">Образовательные программы</span>
        <v-autocomplete
          v-model="vacancy.specializations"
          :items="specializations"
          hide-no-data
          outlined
          hide-selected
          :item-text="concateText"
          item-value="id"
          small-chips
          multiple
          label="Образовательные программы"
          placeholder="Начните вводить, чтобы увидеть список "
          prepend-inner-icon="mdi-database-search"
          return-object
        ></v-autocomplete>
        <span class="mb-2 vacancy__field">Необходимые навыки</span>
        <v-combobox
          v-model="vacancy.skills"
          :items="entries"
          :loading="isLoading"
          :search-input.sync="search"
          hide-no-data
          outlined
          hide-selected
          item-text="text"
          item-value="id"
          small-chips
          multiple
          label="Навыки"
          placeholder="Начните вводить, чтобы увидеть список "
          prepend-inner-icon="mdi-database-search"
          return-object
          @change="search = ''"
        ></v-combobox>
        <span class="mb-2 vacancy__field">Подробное описание вакансии</span>
        <div class="editorx_body">
          <div id="codex-editor" class />
        </div>
        <v-btn
          color="primary"
          class="mt-8"
          large
          block
          elevation="0"
          full-width
          mt-8
          @click="save"
        >
          Сохранить
        </v-btn>
      </v-col>
    </div>
  </div>
</template>

<script>
import EditorJS from '@editorjs/editorjs'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'

export default {
  name: 'CreateVacancy',
  props: {
    activeid: {
      default: 0,
      type: Number,
    },
  },
  data() {
    return {
      specializations: [],
      entries: [],
      isLoading: false,
      isLoading2: false,
      search: null,
      coursesTmpl: {
        name: '',
        link: '',
      },
      experience_types: [
        {
          id: 1,
          name: 'Опыт не требуется',
        },
        {
          id: 2,
          name: 'Опыт от 1 года',
        },
        {
          id: 3,
          name: 'Опыт 3+ лет',
        },
        {
          id: 4,
          name: 'Опыт 5+ лет',
        },
      ],
      employment_types: [
        {
          id: 1,
          name: 'Полная',
        },
        {
          id: 2,
          name: 'Частичная',
        },
        {
          id: 3,
          name: 'Стажировка',
        },
        {
          id: 4,
          name: 'Практика',
        },
      ],
      schedule_types: [
        {
          id: 1,
          name: 'Полный день',
        },
        {
          id: 2,
          name: 'Гибкий график',
        },
        {
          id: 3,
          name: 'Удаленочка',
        },
      ],
      vacancy: {
        name: 'Frontend-разработчик',
        short_description: 'Требуется голодный до задач фронтендер',
        salary: '60000',
        skills: [],
        experience_type: {
          id: 1,
          name: 'Опыт не требуется',
        },
        employment_type: {
          id: 1,
          name: 'Полная',
        },
        schedule_type: {
          id: 3,
          name: 'Удаленочка',
        },
        test: [],
        specializations: [],
        min_points: 0,
        courses: [],
      },
    }
  },
  watch: {
    search(val) {
      if (val?.length < 2 || this.isLoading) return

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
  mounted() {
    this.myEditor()
    this.$api.specializations.specializations().then((res) => {
      this.specializations = res.data
    })
    this.vacancy.courses.push(this.coursesTmpl)
  },
  methods: {
    concateText: (item) => item.name + ' — ' + item.qualification,

    save() {
      EditorJS.save().then((text) => {
        console.log(text)
        const data = {
          ...this.vacancy,
          description: JSON.stringify(text),
          experience_type: this.vacancy.experience_type.id,
          schedule_type: this.vacancy.schedule_type.id,
          employment_type: this.vacancy.employment_type.id,
          specializations: this.vacancy.specializations.map((s) => s.id),
        }
        if (!this.activeid) {
          this.$api.vacancies.createVacancy(data).then((res) => {
            console.log(res.data)
            this.$emit('done')
            this.$store.commit('processes/SET_SUCCESS', 'Вакансия создана')
          })
        } else {
          this.$api.vacancies.createVacancy(data, this.activeid).then((res) => {
            console.log(res.data)
            this.$emit('done')
            this.$store.commit('processes/SET_SUCCESS', 'Вакансия создана')
          })
        }
      })
    },
    myEditor() {
      window.editor = new EditorJS({
        holder: 'codex-editor',
        autofocus: true,
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
        onReady() {},
        onChange() {},
      })
    },
  },
}
</script>

<style scoped>
.editorx_body {
  border: 1px solid #ddd;
  padding: 8px 16px;
  border-radius: 10px;
}

.vacancy__field {
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  margin-top: 0px;
  letter-spacing: 0.4px;

  color: #000000;

  mix-blend-mode: normal;
  opacity: 0.6;
}
</style>
