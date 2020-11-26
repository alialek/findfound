<template>
  <div>
    <v-tabs style="margin-top: 32px" color="#0068CC">
      <v-tab> О себе </v-tab>
      <v-tab> Мои проекты </v-tab>
      <v-tab> Приглашения </v-tab>
      <v-tab-item>
        <v-row>
          <v-col cols="12" class="col-md-9">
            <section class="about-section">
              <div class="about-section__heading d-row align-center">
                <h3>Личная информация</h3>
                <v-btn
                  class="ml-2 d-inline"
                  fab
                  text
                  small
                  @click="disabled.info = !disabled.info"
                >
                  <v-icon color="primary">mdi-cog</v-icon></v-btn
                >
                <v-btn
                  v-if="!disabled.info"
                  class="d-inline"
                  fab
                  text
                  small
                  @click="updateInfo"
                >
                  <v-icon color="success">mdi-content-save</v-icon></v-btn
                >
              </div>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12" class="col-md-6">
                  <div
                    v-if="!disabled.info"
                    class="about-section__info d-row align-baseline"
                  >
                    <b class="about-section__desc"
                      ><v-icon>mdi-badge-account-horizontal-outline</v-icon>
                      Фамилия</b
                    >
                    <div class="about-section__field">
                      <v-text-field
                        v-model="user.last_name"
                        :filled="disabled.info"
                        dense
                        :readonly="disabled.info"
                      ></v-text-field>
                    </div>
                  </div>
                  <div class="about-section__info d-row align-baseline">
                    <b class="about-section__desc"
                      ><v-icon>mdi-at</v-icon> Email</b
                    >
                    <div class="about-section__field">
                      <v-text-field
                        v-model="user.email"
                        :filled="disabled.info"
                        dense
                        :readonly="disabled.info"
                      ></v-text-field>
                    </div>
                  </div>
                  <div class="about-section__info d-row align-baseline">
                    <b class="about-section__desc"
                      ><v-icon>mdi-telegram</v-icon> Telegram</b
                    >
                    <div class="about-section__field">
                      <v-text-field
                        v-model="user.telegram"
                        :filled="disabled.info"
                        dense
                        :readonly="disabled.info"
                      ></v-text-field>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" class="col-md-6">
                  <div
                    v-if="!disabled.info"
                    class="about-section__info d-row align-baseline"
                  >
                    <b class="about-section__desc"
                      ><v-icon>mdi-badge-account-horizontal-outline</v-icon>
                      Имя</b
                    >
                    <div class="about-section__field">
                      <v-text-field
                        v-model="user.first_name"
                        :filled="disabled.info"
                        dense
                        :readonly="disabled.info"
                      ></v-text-field>
                    </div>
                  </div>
                  <div class="about-section__info d-row align-baseline">
                    <b class="about-section__desc"
                      ><v-icon>mdi-account</v-icon> Пол</b
                    >
                    <div class="about-section__field">
                      <v-select
                        v-model="user.sex"
                        :items="sex"
                        :filled="disabled.info"
                        dense
                        :readonly="disabled.info"
                      ></v-select>
                    </div>
                  </div>
                  <div class="about-section__info d-row align-baseline">
                    <b class="about-section__desc"
                      ><v-icon>mdi-calendar</v-icon> Дата рождения</b
                    >
                    <div class="about-section__field">
                      <vc-date-picker
                        v-if="!disabled.info"
                        v-model="user.date_of_birth"
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
                      <v-text-field
                        v-else
                        v-model="dateOfBirth"
                        :filled="disabled.info"
                        dense
                        :readonly="disabled.info"
                      ></v-text-field>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </section>
            <section class="about-section">
              <div class="about-section__heading d-row align-center">
                <h3>Анкета</h3>
                <v-btn
                  v-if="disabled.form"
                  class="ml-2 d-inline"
                  fab
                  text
                  small
                  @click="disabled.form = !disabled.form"
                >
                  <v-icon color="primary">{{
                    isFormCreated ? 'mdi-cog' : 'mdi-plus'
                  }}</v-icon></v-btn
                >
                <v-btn
                  v-if="!disabled.form"
                  class="d-inline"
                  fab
                  text
                  small
                  @click="updateForm"
                >
                  <v-icon color="success">mdi-content-save</v-icon></v-btn
                >
              </div>
              <v-divider v-if="isFormCreated"></v-divider>
              <placeholder
                v-if="!isFormCreated && disabled.form"
                class="my-6"
                text="Вы еще не заполнили анкету"
              />
              <v-row v-if="!disabled.form">
                <v-col cols="12" class="col-md-6">
                  <div class="about-section__info d-row align-baseline">
                    <b class="about-section__desc"
                      ><v-icon>mdi-badge-account-horizontal-outline</v-icon>
                      Фамилия</b
                    >
                    <div class="about-section__field">
                      <v-text-field
                        v-model="user.last_name"
                        :filled="disabled.info"
                        dense
                        :readonly="disabled.info"
                      ></v-text-field>
                    </div>
                  </div>
                  <div class="about-section__info d-row align-baseline">
                    <b class="about-section__desc"
                      ><v-icon>mdi-badge-account-horizontal-outline</v-icon>
                      Фамилия</b
                    >
                    <div class="about-section__field">
                      <v-autocomplete
                        v-model="user.university_id"
                        :items="universities"
                        :search-input.sync="search"
                        hide-no-data
                        hide-selected
                        item-text="name"
                        item-value="id"
                        outlined
                        :readonly="disabled.form"
                        label="Университет"
                        placeholder="Начните вводить название университета"
                        prepend-inner-icon="mdi-domain"
                      ></v-autocomplete>
                    </div>
                  </div>
                  <div class="about-section__info d-row align-baseline">
                    <b class="about-section__desc"
                      ><v-icon>mdi-badge-account-horizontal-outline</v-icon>
                      Фамилия</b
                    >
                    <div class="about-section__field">
                      <v-autocomplete
                        v-model="user.specialization"
                        :items="specializations"
                        hide-no-data
                        hide-selected
                        item-value="id"
                        item-text="name"
                        outlined
                        :readonly="disabled.form"
                        label="Направление подготовки"
                        placeholder="Введите направление"
                        prepend-inner-icon="mdi-school"
                      ></v-autocomplete>
                    </div>
                  </div>
                  <div class="d-row">
                    <v-col class="pd-unset" cols="6"
                      ><v-select
                        v-model="user.degree"
                        outlined
                        :readonly="disabled.form"
                        :items="degrees"
                        item-text="name"
                        item-value="id"
                        label="Степень"
                      ></v-select
                    ></v-col>
                    <v-col class="pd-unset" cols="6">
                      <v-select
                        v-model="user.course"
                        :readonly="disabled.form"
                        outlined
                        :items="course"
                        label="Курс"
                      ></v-select>
                    </v-col>
                  </div> </v-col
              ></v-row>
            </section>
          </v-col>
          <v-col cols="12" class="col-md-3">
            <aside class="about-aside">
              <div class="about-aside__heading">
                <h3>Действия</h3>
                <div @click="dialog = true">
                  <ActionCard
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
            </aside>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item>
        <section class="about-section">
          <div class="about-section__heading d-row align-center">
            <Projects :projects="user.companies" />
          </div>
        </section>
      </v-tab-item>
      <v-tab-item>
        <!-- 
        <v-row style="margin-top: 24px" class="justify-space-around">
          <div
            v-for="vacancy in responses"
            :key="vacancy.vacancy_id"
            @click="$router.push(`vacancy?id=${vacancy.vacancy_id}`)"
          >
            <t-card
              :id="vacancy.vacancy_id"
              :title="vacancy.vacancy_name"
              :seen="vacancy.response_seen"
              :decision="vacancy.response_decision"
              :company="vacancy.company_name"
              :company_id="vacancy.company_id"
              :description="vacancy.vacancy_short_description"
              :logo="vacancy.company_logo"
            />
          </div>
        </v-row>--></v-tab-item
      >
    </v-tabs>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <create-resume @done=";(dialog = false), $emit('refresh')" />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ActionCard from '@/atoms/ActionCard.vue'
import Placeholder from '@/atoms/Placeholder.vue'
import './student.css'
// import TCard from '@/atoms/TCard.vue'
import CreateResume from './CreateResume'
import Projects from './Student/projects'
export default {
  name: 'Student',
  components: {
    CreateResume,
    ActionCard,
    Placeholder,
    Projects,
  },
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  fetch() {
    this.$store.dispatch('utils/getConstants')
  },
  data() {
    return {
      dialog: false,
      disabled: {
        info: true,
        form: true,
      },
      responses: [],
      degrees: [
        {
          id: 'BACHELOR',
          name: 'Бакалавр',
        },
        {
          id: 'MASTER',
          name: 'Магистр',
        },
      ],
      courses: [1, 2, 3, 4, 5],
      search: '',
    }
  },
  computed: {
    isFormCreated() {
      return Object.keys(this.user.form).length
    },
    dateOfBirth() {
      const d = this.user.date_of_birth.split('-')

      return new Date(`${d[0]}-${d[2]}-${d[1]}`).toLocaleDateString('ru-RU', {
        month: 'long',
        year: 'numeric',
        day: 'numeric',
      })
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
  },
  methods: {
    updateForm() {},
    updateInfo() {},
  },
}
</script>

<style scoped>
.editorx_body {
  border: 1px solid #ddd;
  padding: 8px 16px;
  border-radius: 10px;
}
</style>
