<template>
  <div>
    <v-tabs style="margin-top: 32px" color="#0068CC">
      <v-tab> О себе </v-tab>
      <v-tab> Мои проекты </v-tab>
      <v-tab> Отклики </v-tab>
      <v-tab-item>
        <section class="about-section">
          <v-row class="justify-space-between">
            <v-col cols="12" class="col-md-8">
              <v-window v-model="aboutStep">
                <v-window-item>
                  <div>
                    <placeholder
                      v-if="!isFormCreated"
                      class="my-6"
                      text="Вы еще не заполнили анкету"
                      ><v-btn
                        text
                        color="primary"
                        class="mt-2"
                        @click="disabled.form = false"
                        >Заполнить</v-btn
                      ></placeholder
                    >
                    <div v-if="isFormCreated">
                      <resume-viewer :form="user.form" />
                    </div>
                  </div>
                </v-window-item>
                <v-window-item>
                  <div class="about-section__heading d-row align-center">
                    <h3>Личная информация</h3>
                  </div>
                  <v-divider></v-divider>

                  <div class="form-grid">
                    <form-field
                      title="Фамилия"
                      icon="mdi-badge-account-horizontal-outline"
                    >
                      <v-text-field
                        v-model="userData.last_name"
                        filled
                        dense
                      ></v-text-field
                    ></form-field>
                    <form-field
                      title="Имя"
                      icon="mdi-badge-account-horizontal-outline"
                    >
                      <v-text-field
                        v-model="userData.first_name"
                        filled
                        dense
                      ></v-text-field>
                    </form-field>
                  </div>
                  <div class="form-grid">
                    <form-field title="Email" icon="mdi-at">
                      <v-text-field
                        v-model="userData.email"
                        filled
                        dense
                      ></v-text-field>
                    </form-field>
                    <form-field title="Пол" icon="mdi-face-profile">
                      <v-select
                        v-model="userData.sex"
                        :items="sex"
                        filled
                        dense
                      ></v-select>
                    </form-field>
                    <form-field icon="mdi-calendar" title="Дата рождения">
                      <vc-date-picker
                        v-model="userData.date_of_birth"
                        class="picker pt-5"
                      >
                        <template v-slot="{ inputValue, inputEvents }">
                          <input
                            class="bg-white border px-2 py-1 rounded"
                            :value="inputValue"
                            v-on="inputEvents"
                          />
                        </template>
                      </vc-date-picker>
                    </form-field>
                  </div>
                  <v-btn
                    class="my-7 ml-2"
                    color="success"
                    depressed
                    @click="updateInfo"
                  >
                    Сохранить</v-btn
                  >
                </v-window-item>
                <v-window-item>
                  <div>
                    <div class="form-grid">
                      <form-field title="Город" icon="mdi-city">
                        <v-combobox
                          v-model="resume.city"
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
                      <form-field title="Навыки" icon="mdi-hand-okay">
                        <v-combobox
                          :value="resume.skills"
                          class="single-line-combobox"
                          :items="entries"
                          :loading="isLoading"
                          :search-input.sync="search"
                          filled
                          hide-selected
                          dense
                          item-text="text"
                          item-value="id"
                          multiple
                          append-icon="mdi-magnify"
                          placeholder="Начните вводить..."
                          :delimiters="[',']"
                          @change="search = ''"
                          @input="addSkill"
                        >
                          <template v-slot:selection></template>
                          <template v-slot:no-data>
                            <v-list-item>
                              <v-list-item-content>
                                <v-list-item-title v-if="search">
                                  Ничего не найдено по запросу "<strong>{{
                                    search
                                  }}</strong
                                  >".<br />
                                  Нажмите <kbd>enter</kbd>, чтобы добавить новый
                                  навык
                                </v-list-item-title>
                                <v-list-item-title v-else>
                                  Введите навык
                                </v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                          </template></v-combobox
                        >
                        <v-chip-group :show-arrows="true">
                          <v-chip
                            v-for="(skill, i) in resume.skills"
                            :key="i"
                            small
                            close
                            @click:close="removeSkill(skill)"
                            >{{ skill.text }}</v-chip
                          >
                        </v-chip-group>
                      </form-field>
                    </div>

                    <span class="mb-2 resume__field"
                      >Образование
                      <v-icon @click="addEducation">mdi-plus</v-icon></span
                    >

                    <div
                      v-for="(education, i) in resume.educations"
                      :key="education.id"
                    >
                      <div class="form-grid" :key="education.id">
                        <form-field
                          title="Год выпуска"
                          icon="mdi-calendar-range"
                        >
                          <v-select
                            :key="education.id"
                            v-model="education.graduate_year"
                            filled
                            dense
                            placeholder="Выберите год"
                            :items="years"
                          ></v-select>
                        </form-field>

                        <form-field title="Университет" icon="mdi-school">
                          <v-combobox
                            ref="autocom"
                            :key="education.id"
                            v-model="education.university"
                            :items="universities"
                            :search-input="searchUni"
                            :menu-props="{
                              overflowX: false,
                            }"
                            hide-no-data
                            hide-selected
                            item-text="name"
                            item-value="id"
                            filled
                            dense
                            placeholder="Начните вводить название"
                          ></v-combobox>
                        </form-field>
                        <form-field title="Направление" icon="mdi-pen">
                          <v-combobox
                            v-if="specializations.length > 0"
                            :key="education.id"
                            v-model="education.specialization"
                            :items="specializations"
                            :search-input="search_spec"
                            hide-no-data
                            :menu-props="{
                              overflowX: false,
                            }"
                            dense
                            hide-selected
                            :item-text="concateText"
                            item-value="id"
                            filled
                            placeholder="Введите направление"
                          ></v-combobox>
                        </form-field>
                      </div>
                      <v-btn
                        v-if="i !== 0"
                        text
                        color="error"
                        small
                        @click="
                          resume.educations = resume.educations.splice(i, 1)
                        "
                        >Удалить</v-btn
                      >

                      <v-divider class="my-4"></v-divider>
                    </div>
                    <span class="mb-2 resume__field"
                      >Работа <v-icon @click="addJob">mdi-plus</v-icon></span
                    >
                    <div v-for="(job, i) in resume.jobs" :key="i + 'jobs'">
                      <div class="form-grid">
                        <form-field title="Компания" icon="mdi-domain">
                          <v-text-field
                            v-model="job.name"
                            filled
                            placeholder="FindFound"
                            dense
                          >
                          </v-text-field>
                        </form-field>
                        <form-field title="Стаж" icon="mdi-calendar-month">
                          <v-text-field
                            v-model="job.duration"
                            filled
                            dense
                            placeholder="Количество месяцев"
                            ><template v-slot:append
                              ><span style="color: #757575"
                                >мес.</span
                              ></template
                            ></v-text-field
                          >
                        </form-field>
                        <form-field title="Обязанности" icon="mdi-shovel">
                          <v-textarea
                            v-model="job.duties"
                            filled
                            dense
                            placeholder="Обязанности на работе"
                          >
                          </v-textarea>
                        </form-field>
                      </div>
                      <v-btn
                        v-if="i !== 0"
                        text
                        color="error"
                        small
                        @click="deleteJob(job.id)"
                        >Удалить</v-btn
                      >
                      <v-divider class="my-4"></v-divider>
                    </div>
                    <div class="form-grid">
                      <form-field
                        v-for="contact in filteredContacts"
                        :key="contact.id"
                        :title="contact.name"
                        :icon="contact.icon"
                      >
                        <v-text-field
                          v-model="resume[contact.id]"
                          filled
                          dense
                          placeholder="Введите ссылку"
                        ></v-text-field>
                      </form-field>
                    </div>
                  </div>
                  <v-btn class="mt-4" color="success" depressed @click="save"
                    >Сохранить</v-btn
                  >
                </v-window-item>
              </v-window>
            </v-col>

            <aside class="about-aside">
              <div class="about-aside__heading">
                <h3>Действия</h3>
                <div class="d-col">
                  <div
                    @click="aboutStep === 1 ? (aboutStep = 0) : (aboutStep = 1)"
                  >
                    <ActionCard
                      icon="mdi-pen"
                      title="Личная информация"
                      desc="Изменить данные о себе"
                    />
                  </div>
                  <div @click="changeForm(isFormCreated)">
                    <ActionCard
                      :icon="!isFormCreated ? 'mdi-plus' : 'mdi-pen'"
                      :title="
                        !isFormCreated ? 'Заполнить анкету' : 'Изменить анкету'
                      "
                      :desc="
                        !isFormCreated
                          ? 'Чтобы выделиться на фоне других участников'
                          : 'Чтобы сохранить ее в актуальном состоянии'
                      "
                    />
                  </div>
                </div>
              </div>
            </aside>
          </v-row>
        </section>
      </v-tab-item>
      <v-tab-item>
        <section class="about-section">
          <Projects :projects="user.companies" @refresh="$emit('refresh')" />
        </section>
      </v-tab-item>
      <v-tab-item>
        <section class="about-section">
          <Invitations :responses="responses" />
        </section>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import ActionCard from '@/atoms/ActionCard.vue'
import Placeholder from '@/atoms/Placeholder.vue'
import FormField from '@/atoms/Form-field.vue'
import './cabinet.css'
import Vue from 'vue'
import Projects from './projects'
import Invitations from './Invitations.vue'
import ResumeViewer from './ResumeViewer.vue'
export default {
  name: 'Cabinet',
  components: {
    ActionCard,
    Placeholder,
    FormField,
    Projects,
    Invitations,
    ResumeViewer,
  },
  props: {
    user: {
      type: Object,
      default: () => {},
    },
    responses: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      userData: Vue.util.extend({}, this.user),
      url: null,
      photo: null,
      years: [],
      searchCity: null,
      aboutStep: 0,
      searchUni: '',
      entries: [],
      isLoading2: false,
      search: '',
      isLoading: false,
      filteredContacts: [],
      dialog: false,
      disabled: {
        form: true,
      },
      courses: [1, 2, 3, 4, 5],
      search_spec: '',
      jobsTmpl: {
        duration: null,
        name: '',
        duties: [''],
      },
      educationTmpl: {
        graduate_year: null,
        university: null,
        specialization: null,
      },
      searchSoft: '',
      resume: {
        city: null,
        skills: [],
        jobs: [],
        educations: [],
        vk: null,
        website: null,
        linkedin: null,
        facebook: null,
        github: null,
        telegram: null,
      },
    }
  },
  computed: {
    isFormCreated() {
      return Object.keys(this.user.form).length
    },
    degrees() {
      return this.$store.state.utils.degrees
    },
    universities() {
      return this.$store.state.utils.universities
    },
    specializations() {
      return this.$store.state.utils.specializations
    },
    cities() {
      return this.$store.state.utils.cities
    },
    sex() {
      return this.$store.state.utils.sex
    },
    contacts() {
      return this.$store.state.utils.contacts
    },
    getCityName() {
      try {
        return this.cities.filter((city) => city.id === +this.user.form.city)[0]
          .name
      } catch {
        return 'Нет данных'
      }
    },
    decision() {
      return this.$store.state.utils.decision
    },
  },
  watch: {
    search(val) {
      if (val === null || val?.length < 2 || this.isLoading) return
      console.log(val)
      this.isLoading = true

      this.$api.skillset
        .skillset({ text: val })
        .then((res) => {
          this.entries = res.data.items || []
        })
        .finally(() => (this.isLoading = false))
    },
  },
  mounted() {
    this.filteredContacts = this.$store.state.utils.contacts
      .filter(
        (contact) => contact.id !== 'twitter' && contact.id !== 'instagram'
      )
      .slice()

    for (let i = 2024; i >= 1990; i--) {
      this.years.push(i)
    }
  },
  methods: {
    addJob() {
      this.resume.jobs = [
        ...this.resume.jobs,
        {
          ...this.$helpers.deepCopy(this.jobsTmpl),
          id: Math.random(),
        },
      ]
    },
    addEducation() {
      this.resume.educations = [
        ...this.resume.educations,
        {
          ...this.$helpers.deepCopy(this.educationTmpl),
          id: Math.random(),
        },
      ]
    },
    removeSkill(item) {
      this.resume.skills = this.resume.skills.filter(
        (skill) => skill.text !== item.text
      )
    },
    addSkill(items) {
      this.resume.skills = items.map((item) =>
        typeof item === 'object' ? item : { text: item }
      )
    },
    changeForm(isFormCreated) {
      if (isFormCreated && this.aboutStep !== 2) {
        this.resume = {
          ...this.$helpers.deepCopy(this.user.form),
          city: this.cities.filter(
            (city) => city.id === +this.user.form.city
          )[0],
        }
      }
      this.windowNavigation()
    },
    windowNavigation() {
      this.aboutStep === 2 ? (this.aboutStep = 0) : (this.aboutStep = 2)
    },
    Preview_image() {
      this.url = URL.createObjectURL(this.photo)
    },
    concateText: (item) => item.name + ' — ' + item.qualification,
    save() {
      const contact = Object.create(null)
      this.filteredContacts.map((c) =>
        c.value !== '' ? (contact[c.id] = c.value) : ''
      )
      const data = {
        ...this.resume,
        city: this.resume.city.id,
        ...contact,
        educations: this.resume.educations.map((ed) => ({
          specialization: ed.specialization.id,
          university: ed.university.id,
          graduate_year: ed.graduate_year,
        })),
        jobs: this.resume.jobs.map((j) => ({
          duration: j.duration,
          name: j.name,
          duties: j.duties,
        })),
      }
      this.$api.forms.createForm(data).then((res) => {
        this.$store.commit('processes/SET_SUCCESS', 'Резюме обновлено')
        this.aboutStep = 0
        this.$emit('refresh')
      })
    },
    deleteJob(id) {
      this.resume.jobs = this.resume.jobs.filter((item) => id !== item.id)
    },
    updateForm() {},
    updateInfo() {
      this.$api.users
        .updateUserInfo({
          first_name: this.userData.first_name,
          last_name: this.userData.last_name,
          sex: this.userData.sex,
          email: this.userData.email,
          date_of_birth: this.$helpers.formatDate(this.userData.date_of_birth),
        })
        .then(() => {
          this.$store.commit('processes/SET_SUCCESS', 'Информация обновлена')
          this.$emit('refresh')
          this.aboutStep = 0
        })
        .catch((err) => {
          this.$store.commit('processes/SET_ERROR', err.response.data)
        })
    },
  },
}
</script>
