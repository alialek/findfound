<template>
  <div class="d-row justify-center">
    <div class="mt-4">
      <v-col style="width: 500px">
        <span class="mb-2 resume__field">Цель</span>

        <v-text-field v-model="resume.aim" outlined placeholder="Цель" />

        <span class="mb-2 resume__field">Навыки</span>
        <v-row class="pd-unset">
          <v-col cols="12">
            <v-combobox
              v-model="resume.extra_skills"
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
              single-line
              label="Дополнительные навыки"
              placeholder="Начните вводить, чтобы увидеть список "
              prepend-inner-icon="mdi-database-search"
              return-object
              @change="search = ''"
            ></v-combobox>
            <v-combobox
              v-model="resume.soft_skills"
              :search-input.sync="searchSoft"
              outlined
              small-chips
              multiple
              single-line
              :delimiters="[',']"
              label="Личные качества"
            >
              <template v-slot:no-data>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      Начните вводить навыки через запятую
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template></v-combobox
            ></v-col
          >
        </v-row>

        <span class="mb-2 resume__field"
          >Образование
          <v-icon @click="resume.educations.push(educationTmpl)"
            >mdi-plus</v-icon
          ></span
        >
        <div v-for="(education, i) in resume.educations" :key="i + 'ed'">
          <v-row class="pd-unset">
            <v-col cols="12" style="padding-bottom: unset" class="col-md-6">
              <v-select
                v-model="education.start.year"
                outlined
                label="Год начала обучения"
                :items="years"
              ></v-select>
            </v-col>
            <v-col cols="12" style="padding-bottom: unset" class="col-md-6">
              <v-select
                v-model="education.end.year"
                outlined
                label="Год выпуска"
                :items="years"
              ></v-select>
            </v-col>
          </v-row>
          <v-combobox
            ref="autocom"
            v-model="education.university"
            :items="universities"
            :search-input.sync="searchUni"
            :menu-props="{
              maxWidth: width,
              overflowX: false,
            }"
            hide-no-data
            hide-selected
            item-text="name"
            item-value="id"
            outlined
            label="Университет"
            placeholder="Начните вводить название университета"
            prepend-inner-icon="mdi-domain"
          ></v-combobox>
          <v-autocomplete
            v-model="education.specialization"
            :items="specializations"
            :search-input.sync="search_spec"
            hide-no-data
            hide-selected
            :item-text="concateText"
            item-value="id"
            outlined
            label="Направление подготовки"
            placeholder="Введите направление"
            prepend-inner-icon="mdi-school"
          ></v-autocomplete>
          <v-checkbox v-model="resume.extra" style="margin-top: unset">
            <template v-slot:label> Дополнительное образование </template>
          </v-checkbox>
          <v-divider class="my-4"></v-divider>
        </div>
        <span class="mb-2 resume__field"
          >Работа
          <v-icon @click="resume.jobs.push(jobsTmpl)">mdi-plus</v-icon></span
        >
        <div v-for="(job, i) in resume.jobs" :key="i + 'jobs'">
          <v-text-field v-model="job.name" outlined label="Название компании">
          </v-text-field>
          <v-combobox
            v-model="job.duties"
            :delimiters="[',']"
            outlined
            label="Обязанности на работе"
          >
          </v-combobox>
          <v-row class="pd-unset">
            <v-col
              cols="6"
              style="padding-bottom: unset; padding-top: unset"
              class="col-md-6"
            >
              <span class="mb-2 resume__field">Начало</span>
            </v-col>
            <v-col
              v-if="!job.isActual"
              cols="6"
              style="padding-bottom: unset; padding-top: unset"
              class="col-md-6"
            >
              <span class="mb-2 resume__field">Конец</span>
            </v-col></v-row
          >
          <v-row class="pd-unset">
            <v-col cols="6" style="padding-bottom: unset" class="col-md-3">
              <v-select
                v-model="job.start.month"
                outlined
                label="Месяц"
                :items="months"
              ></v-select>
            </v-col>
            <v-col cols="6" style="padding-bottom: unset" class="col-md-3">
              <v-select
                v-model="job.start.year"
                outlined
                label="Год"
                :items="years"
              ></v-select>
            </v-col>

            <v-col
              v-if="!job.isActual"
              cols="6"
              style="padding-bottom: unset"
              class="col-md-3"
            >
              <v-select
                v-model="job.end.month"
                outlined
                label="Месяц"
                :items="months"
              ></v-select>
            </v-col>
            <v-col
              v-if="!job.isActual"
              cols="6"
              style="padding-bottom: unset"
              class="col-md-3"
            >
              <v-select
                v-model="job.end.year"
                outlined
                label="Год"
                :items="years"
              ></v-select>
            </v-col>
          </v-row>
          <v-checkbox v-model="job.isActual">
            <template v-slot:label> По настоящее время </template>
          </v-checkbox>
          <v-divider class="my-4"></v-divider>
        </div>

        <!-- <div v-for="(achievement, i) in resume.achievements" :key="i + 'a'">
          <v-text-field
            v-model="resume.achievements[i]"
            label="Достижение"
            outlined
          ></v-text-field>
        </div> -->

        <v-btn depressed color="primary" mt-8 @click="save"> Сохранить </v-btn>
      </v-col>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Createresume',
  props: {
    activeid: {
      default: 0,
      type: Number,
    },
  },
  data() {
    return {
      years: [],
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      specializations: [],
      entries: [],
      isLoading: false,
      search: '',
      isLoading2: false,

      searchUni: '',

      width: 300,
      search_spec: '',
      universities: [],
      jobsTmpl: {
        start: {
          month: '',
          year: '',
        },
        end: {
          month: '',
          year: '',
        },
        isActual: false,
        name: 'Selectel',
        duties: ['Работа с контр-агентами'],
      },
      educationTmpl: {
        start: {
          month: '',
          year: '',
        },
        end: {
          month: '',
          year: '',
        },
        university: '',
        specialization: '',
        is_extra: false,
      },
      searchSoft: '',
      resume: {
        aim: 'Трудоустройство',
        extra_skills: [],
        soft_skills: ['исполнительный', 'трудолюбивый'],
        achievements: ['Русский медвежонок 2009', 'Кенгуру 210'],
        jobs: [],
        educations: [],
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
    this.$api.specializations.specializations().then((res) => {
      this.specializations = res.data
    })
    this.$api.universities.universities().then((res) => {
      this.universities = res.data
    })
    try {
      this.width = this.$refs.autocom.$el.getBoundingClientRect().width
    } catch (err) {}
    this.resume.educations.push(this.educationTmpl)
    this.resume.jobs.push(this.jobsTmpl)

    for (let i = 1960; i <= 2020; i++) {
      this.years.push(i)
    }
  },
  methods: {
    concateText: (item) => item.name + ' — ' + item.qualification,

    save() {
      const data = {
        ...this.resume,
        educations: this.resume.educations.map((j) => {
          return {
            started: `${j.start.year}`,
            ended: j.isActual ? 'Актуальное' : `${j.end.year}`,
            university: j.university.id,
            is_extra: j.is_extra,
            specialization: j.specialization,
          }
        }),
        jobs: this.resume.jobs.map((j) => {
          return {
            started: `${j.start.month}.${j.start.year}`,
            ended: j.isActual ? 'Актуальное' : `${j.end.month}.${j.end.year}`,
            name: j.name,
            duties: j.duties,
          }
        }),
      }
      if (!this.activeid) {
        this.$api.forms.forms(data).then((res) => {
          this.$emit('done')
          this.$store.commit('processes/SET_SUCCESS', 'Резюме обновлено')
        })
      } else {
        this.$api.forms.createUserResume(data, this.activeid).then((res) => {
          this.$emit('done')
          this.$store.commit('processes/SET_SUCCESS', 'Резюме обновлено')
        })
      }
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

.resume__field {
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
