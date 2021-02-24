<template>
  <div>
    <v-tabs style="margin-top: 32px" color="#0068CC">
      <v-tab>
        <v-icon left> mdi-information-outline </v-icon>
        О Проекте
      </v-tab>
      <v-tab>
        <v-icon left> mdi-account </v-icon> Вакансии
        <v-badge
          v-if="project.vacancies.length"
          :content="project.vacancies.length"
          bordered
        ></v-badge>
      </v-tab>

      <v-tab v-if="project.is_admin">
        <v-icon left> mdi-email </v-icon> Отклики
        <v-badge v-if="responses.length" :content="responses.length" bordered>
        </v-badge>
      </v-tab>

      <v-tab-item>
        <section class="about-section">
          <v-row>
            <v-col cols="12" class="col-sm-9">
              <section id="about">
                <div class="information">
                  <div class="d-row description">
                    <div class="d-col">
                      <b>Описание</b>
                      {{ project.description }}
                    </div>
                  </div>
                </div>
                <div class="team">
                  <div class="about-section__heading">
                    <b>Команда</b>
                  </div>

                  <div v-if="project.roles.length" class="d-row">
                    <Participant-card
                      v-for="role in project.roles"
                      :key="role.id"
                      :photo="role.photo"
                      :position="role.position"
                      :full-name="role.full_name"
                      :description="role.description"
                    ></Participant-card>
                  </div>
                  <div v-else>
                    <placeholder
                      class="my-6"
                      text="Участники команды не указаны"
                      emoji="/img/e_business_person.png"
                    ></placeholder>
                  </div>
                </div>
              </section>
            </v-col>
            <v-col cols="12" class="col-sm-3">
              <div class="d-col">
                <div>
                  <p style="margin-top: 0px" class="small-header">Город</p>
                  <b style="margin-top: 16px"> {{ project.city.name }}</b>
                </div>
                <div>
                  <p class="small-header">Стадия</p>
                  <b style="margin-top: 16px"> {{ project.state }}</b>
                </div>
                <div>
                  <p class="small-header">Отрасль</p>
                  <b style="margin-top: 16px"> {{ project.subject }}</b>
                </div>
                <v-divider style="margin: 32px 0"></v-divider></div
            ></v-col>
          </v-row>
        </section>
      </v-tab-item>
      <v-tab-item>
        <v-window v-model="vacancyStep">
          <v-window-item :value="1">
            <section id="vacancy" class="about-section">
              <v-row>
                <v-col cols="12" class="col-sm-9">
                  <v-row v-if="project.vacancies.length > 0">
                    <t-card
                      v-for="v in project.vacancies"
                      :id="v.id"
                      :key="v.id"
                      :logo="project.logo"
                      :title="v.name"
                      :skills="v.skills"
                      :description="v.short_description"
                    >
                      <template v-slot:menu>
                        <v-menu v-if="project.is_admin" offset-y>
                          <template v-slot:activator="{ on }">
                            <v-icon v-on="on">mdi-dots-vertical</v-icon>
                          </template>
                          <v-list dense>
                            <v-list-item
                              color="error"
                              @click="deleteVacancy(v.id)"
                            >
                              <v-list-item-icon>
                                <v-icon>mdi-delete</v-icon>
                              </v-list-item-icon>
                              <v-list-item-title>Удалить</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="editVacancy(v.id)">
                              <v-list-item-icon>
                                <v-icon>mdi-pencil</v-icon>
                              </v-list-item-icon>
                              <v-list-item-title>Изменить</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </template></t-card
                    >
                  </v-row>

                  <v-row
                    v-if="project.vacancies.length === 0"
                    class="justify-center"
                    style="margin-top: 24px"
                  >
                    <v-col class="align-center">
                      <placeholder
                        class="my-6"
                        text="Вакансии еще не опубликованы"
                        ><v-btn
                          v-if="project.is_admin"
                          text
                          color="primary"
                          class="mt-2"
                          @click="vacancyStep = 2"
                          >Заполнить</v-btn
                        ></placeholder
                      >
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  v-if="project.is_admin && project.vacancies.length !== 0"
                  cols="12"
                  class="col-md-3"
                >
                  <div @click="vacancyStep = 2">
                    <ActionCard
                      title="Создать вакансию"
                      desc="Нажмите на карточку, чтобы открыть форму"
                    />
                  </div>
                </v-col>
              </v-row>
            </section>
          </v-window-item>
          <v-window-item :value="2">
            <section class="about-section">
              <div class="about-section__heading d-row align-center">
                <v-btn class="d-inline" fab text small @click="vacancyStep = 1">
                  <v-icon color="primary">mdi-arrow-left</v-icon></v-btn
                >
                <h3>Новая вакансия</h3>
              </div>
              <v-divider></v-divider>

              <v-row>
                <v-col cols="12" class="col-md-6">
                  <form-field icon="mdi-text-account" title="Заголовок">
                    <v-text-field
                      v-model="vacancy.name"
                      :filled="disabled.vacancy"
                      placeholder="Название вакансии"
                      dense
                    ></v-text-field>
                  </form-field>
                  <form-field icon="mdi-text" title="О вакансии">
                    <v-text-field
                      v-model="vacancy.short_description"
                      :filled="disabled.vacancy"
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
                      :filled="disabled.vacancy"
                    ></v-select>
                  </form-field>

                  <form-field
                    icon="mdi-office-building-marker"
                    title="Тип занятости"
                  >
                    <v-select
                      v-model="vacancy.employment_type"
                      item-text="name"
                      item-value="id"
                      placeholder="Выберите занятость"
                      :items="employment_types"
                      dense
                      :filled="disabled.vacancy"
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
                    <v-text-field
                      v-model="vacancy.salary"
                      filled
                      dense
                    ></v-text-field>
                  </form-field>
                  <form-field icon="mdi-circle-slice-1" title="Условия">
                    <v-text-field
                      v-model="vacancy.partnership"
                      placeholder="Зарплата, доля в проекте..."
                      :filled="disabled.vacancy"
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
                      :filled="disabled.vacancy"
                    ></v-select>
                  </form-field>
                </v-col>
              </v-row>
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
                  hide-no-data
                  hide-selected
                  item-text="text"
                  item-value="id"
                  small-chips
                  dense
                  multiple
                  filled
                  placeholder="Начните вводить, чтобы увидеть список "
                  return-object
                  style="max-width: 650px"
                  @change="search = ''"
                ></v-combobox>
              </form-field>
              <form-field
                icon="mdi-text-subject"
                title="Описание"
                max-width="100%"
              >
                <div class="editorx_body">
                  <div id="codex-editor" />
                </div>
              </form-field>

              <v-btn color="success" class="my-8" depressed @click="save">
                Создать
              </v-btn>
            </section>
          </v-window-item>
        </v-window>
      </v-tab-item>
      <v-tab-item>
        <responses-tab :items="responses" />
      </v-tab-item>
    </v-tabs>
    <v-dialog v-model="editVacancyDialog" fullscreen hide-overlay>
      <vacancy-editor
        :vacancy-id="activeVacancy"
        @closeVacancyEditor="editVacancyDialog = false"
      />
    </v-dialog>
  </div>
</template>

<script>
import ActionCard from '@/atoms/ActionCard.vue'
import ParticipantCard from '@/atoms/Participant-card.vue'
import FormField from '@/atoms/Form-field.vue'
import EditorJS from '@editorjs/editorjs'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
import TCard from '@/atoms/TCard'
import Placeholder from '@/atoms/Placeholder.vue'
import ResponsesTab from './Responses-tab.vue'
import VacancyEditor from './VacancyEditor.vue'
export default {
  name: 'Project',
  components: {
    FormField,
    ActionCard,
    Placeholder,
    ParticipantCard,
    VacancyEditor,
    TCard,
    ResponsesTab,
  },
  props: {
    user: {
      type: Object,
      default: () => {},
    },
    project: {
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
      editVacancyDialog: false,
      entries: [],
      activeVacancy: null,
      isLoading: false,
      search: null,
      salaryEnabled: false,
      disabled: {
        vacancy: true,
      },
      vacancy: {
        name: null,
        partnership: null,
        description: null,
        short_description: null,
        salary: 0,
        company_id: null,
        schedule_type: null,
        employment_type: null,
        experience_type: null,
        skills: [],
      },
      vacancyStep: 1,
      dialog: false,
    }
  },
  computed: {
    vacancies() {
      return this.$store.state.vacancies.vacancies
    },
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
    vacancyStep(val) {
      console.log(val)
      if (val === 2)
        setTimeout(() => {
          this.myEditor()
        }, 100)
    },
  },
  methods: {
    editVacancy(id) {
      this.activeVacancy = id
      this.editVacancyDialog = true
    },
    save() {
      window.editor.save().then((text) => {
        const data = {
          ...this.vacancy,
          description: JSON.stringify(text),
          company_id: this.project.id,
        }
        this.$api.vacancies
          .createVacancy(data)
          .then((res) => {
            this.vacancyStep = 1
            this.$store.dispatch('getProject', this.project.id)
            this.$store.commit('processes/SET_SUCCESS', 'Вакансия создана')
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
    sendDecision(id, decision, comment) {
      console.log(id, decision, comment)
      this.$api.invitations.sendInvitiation({ vacancy_id: id }).then((res) => {
        this.$commit(
          'processes/SET_SUCCESS',
          decision === 'ACCEPT'
            ? 'Приглашение отправлено'
            : 'Пользователю отправлен отказ'
        )
      })
    },
    deleteVacancy(id) {
      this.$api.vacancies
        .deleteVacancy(id)
        .then((res) => {
          this.$store.commit('processes/SET_SUCCESS', 'Вакансия удалена')
          this.$store.commit('project/filterVacancies', id)
        })
        .catch((err) => {
          console.log(err)
          this.$store.commit('processes/SET_ERROR', 'Произошла ошибка')
        })
    },
    myEditor() {
      window.editor = new EditorJS({
        holder: 'codex-editor',
        autofocus: true,
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
        onReady() {},
        onChange() {},
      })
    },
  },
}
</script>

<style scoped>
.description,
.information {
  margin-bottom: 16px;
}
</style>
