<template>
  <div class="d-row justify-center">
    <div class="mt-4">
      <v-col style="width: 500px">
        <span class="mb-2 resume__field">Цель</span>

        <v-text-field
          v-model="resume.aim"
          outlined
          readonly
          placeholder="Цель"
        />

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
              readonly
              multiple
              single-line
              label="Дополнительные навыки"
              placeholder="Начните вводить, чтобы увидеть список "
              prepend-inner-icon="mdi-database-search"
              return-object
            ></v-combobox>
            <v-combobox
              v-model="resume.soft_skills"
              :search-input.sync="searchSoft"
              outlined
              small-chips
              readonly
              multiple
              single-line
              :delimiters="[',']"
              label="Личные качества"
            >
            </v-combobox
          ></v-col>
        </v-row>
        <span class="mb-2 resume__field">Достижения</span>
        <div v-for="(achievement, i) in resume.achievements" :key="i + 'a'">
          <v-text-field
            v-model="resume.achievements[i]"
            readonly
            label="Достижение"
            outlined
          ></v-text-field>
        </div>
        <span class="mb-2 resume__field">Образование </span>
        <div v-for="(education, i) in resume.educations" :key="i + 'ed'">
          <v-row class="pd-unset">
            <v-col cols="12" style="padding-bottom: unset" class="col-md-6">
              <v-text-field
                v-model="education.started"
                outlined
                readonly
                label="Год начала обучения"
              />
            </v-col>
            <v-col cols="12" style="padding-bottom: unset" class="col-md-6">
              <v-text-field
                v-model="education.ended"
                outlined
                readonly
                label="Год выпуска"
                :items="years"
              />
            </v-col>
          </v-row>
          <v-combobox
            ref="autocom"
            v-model="education.university"
            :items="universities"
            :menu-props="{
              maxWidth: width,
              overflowX: false,
            }"
            hide-no-data
            hide-selected
            item-text="name"
            readonly
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
            readonly
            label="Направление подготовки"
            placeholder="Введите направление"
            prepend-inner-icon="mdi-school"
          ></v-autocomplete>
          <v-checkbox
            v-if="education.is_extra"
            v-model="education.is_extra"
            style="margin-top: unset"
          >
            <template v-slot:label> Дополнительное образование </template>
          </v-checkbox>
          <v-divider class="my-4"></v-divider>
        </div>
        <span class="mb-2 resume__field">Работа </span>
        <div v-for="(job, i) in resume.jobs" :key="i + 'jobs'">
          <v-text-field v-model="job.name" outlined label="Название компании">
          </v-text-field>
          <v-text-field
            outlined
            label="Обязанности на работе"
            :value="job.duties.join('')"
          />

          <v-row class="pd-unset">
            <v-col
              cols="3"
              style="padding-bottom: unset; padding-top: unset"
              class="col-md-3"
            >
              <span class="mb-2 resume__field">Начало</span>
            </v-col>
            <v-col
              v-if="!job.isActual"
              cols="3"
              style="padding-bottom: unset; padding-top: unset"
              class="col-md-3"
            >
              <span class="mb-2 resume__field">Конец</span>
            </v-col></v-row
          >
          <v-row class="pd-unset">
            <v-col cols="6" style="padding-bottom: unset" class="col-md-3">
              <v-text-field v-model="job.started" outlined label="Начало" />
            </v-col>

            <v-col cols="6" style="padding-bottom: unset" class="col-md-3">
              <v-text-field v-model="job.ended" outlined label="Конец" />
            </v-col>
          </v-row>

          <v-divider class="my-4"></v-divider>
        </div>
      </v-col>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResumeViewer',
  props: {
    resume: {
      type: Object,
      default: () => {},
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

      searchSoft: '',
    }
  },
  mounted() {
    console.log(this.resume)
    // specializations().then((res) => {
    //   this.specializations = res.data
    // })
    // universities().then((res) => {
    //   this.universities = res.data
    // })

    for (let i = 2020; i >= 1960; i--) {
      this.years.push(i)
    }
  },

  methods: {
    concateText: (item) => item.name + ' — ' + item.qualification,
  },
}
</script>

<style scoped>
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
