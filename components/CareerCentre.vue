<template>
  <div>
    <v-tabs style="margin-top: 32px" color="#0068CC">
      <v-tab>
        <v-icon left> mdi-chart-arc </v-icon>
        Статистика
      </v-tab>
      <v-tab>
        <v-icon left> mdi-file </v-icon>
        Вакансии
      </v-tab>
      <v-tab>
        <v-icon left> mdi-domain </v-icon>
        Компании
      </v-tab>
      <v-tab>
        <v-icon left> mdi-account </v-icon>
        Пользователи
      </v-tab>

      <v-tab-item>
        <v-row style="margin-top: 24px">
          <v-col cols="3">
            <div class="table-board stats">
              <h1 class="text-h3">{{ metrics.forms_total }}</h1>
              <span>резюме</span>
            </div></v-col
          >
          <v-col cols="3">
            <div class="table-board stats">
              <h1 class="text-h3">{{ metrics.vacancies_total }}</h1>
              <span>вакансий</span>
            </div></v-col
          >
          <v-col cols="3">
            <div class="table-board stats">
              <h1 class="text-h3">{{ metrics.companies_total }}</h1>
              <span>компаний</span>
            </div></v-col
          >
          <v-col cols="3">
            <div class="table-board stats">
              <h1 class="text-h3">{{ getPercentage }}%</h1>
              <span>приглашений на отклики</span>
            </div></v-col
          ></v-row
        >
      </v-tab-item>
      <v-tab-item>
        <v-row style="margin-top: 24px">
          <v-col cols="12">
            <div class="table-board">
              <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="searchVac"
                  append-icon="mdi-magnify"
                  label="Поиск по вакансиям"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <!-- <v-data-table
                locale="ru-RU"
                :headers="headersVac"
                :items="itemsVac"
                :search="searchVac"
              >
                <template v-slot:item.actions="{ item }">
                  <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                  </v-icon>
                  <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
                </template>
                <template v-slot:item.is_active="{ item }">
                  <div
                    v-if="item.is_active"
                    class="mx-auto indicator indicator--success"
                  ></div>
                  <div v-else class="mx-auto indicator indicator--error"></div>
                </template>
                <template v-slot:item.approved="{ item }">
                  <div
                    v-if="item.approved"
                    class="mx-auto indicator indicator--success"
                  ></div>
                  <div v-else class="mx-auto indicator indicator--error"></div>
                </template>
                <template v-slot:item.company_name="{ item }">
                  <router-link :to="`company?id=${item.company_id}`">
                    {{ item.company_name }}</router-link
                  >
                </template>
                <template v-slot:item.name="{ item }">
                  <router-link :to="`vacancy?id=${item.id}`">
                    {{ item.name }}</router-link
                  >
                </template>
              </v-data-table> -->
            </div></v-col
          >
        </v-row>
      </v-tab-item>
      <v-tab-item>
        <v-row style="margin-top: 24px">
          <v-col cols="12" class="col-md-8">
            <div class="table-board">
              <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="searchCompany"
                  append-icon="mdi-magnify"
                  label="Поиск по компаниям"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <!-- <v-data-table
                :headers="headersCompany"
                :items="itemsCompany"
                :search="searchCompany"
              >
                <template v-slot:item.actions="{ item }">
                  <v-btn fab color="primary" x-small elevation="0"
                    ><v-icon @click="openVacancyModal(item)">
                      mdi-plus
                    </v-icon></v-btn
                  >
                </template>
                <template v-slot:item.vacancies_count="{ item }">
                  <v-badge color="green" :content="item.vacancies_count">
                  </v-badge>
                </template>
                <template v-slot:item.hr_last_name="{ item }">
                  {{ `${item.hr_last_name} ${item.hr_first_name}` }}
                </template>
                <template v-slot:item.name="{ item }">
                  <router-link :to="`company?id=${item.id}`">
                    {{ item.name }}</router-link
                  >
                </template>
              </v-data-table> -->
            </div>
          </v-col>

          <v-col cols="12" class="col-md-4 align-center"
            ><div @click="dialogNewCompany = true">
              <ActionCard
                title="Создать компанию"
                desc="А после можно будет добавить вакансию"
              />
            </div>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item>
        <v-row style="margin-top: 24px">
          <v-col cols="12" class="col-md-8">
            <div class="table-board">
              <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="searchUsers"
                  append-icon="mdi-magnify"
                  label="Поиск по пользователям"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <!-- <v-data-table
                :headers="headersUsers"
                :items="itemsUsers"
                :search="searchUsers"
              >
                <template v-slot:item.actions="{ item }">
                  <v-btn fab color="primary" x-small elevation="0"
                    ><v-icon @click="openResumeModal(item)">
                      mdi-plus
                    </v-icon></v-btn
                  >
                </template>
                <template v-slot:item.is_filled="{ item }">
                  <div
                    v-if="item.is_filled"
                    class="mx-auto indicator indicator--success"
                  ></div>
                  <div v-else class="mx-auto indicator indicator--error"></div>
                </template>
              </v-data-table> -->
            </div>
          </v-col>

          <v-col cols="12" class="col-md-4 align-center"
            ><div @click="dialogNewStudent = true">
              <ActionCard title="Добавить студента" desc="Вместе с резюме" />
            </div>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs>
    <v-dialog v-model="dialogNewCompany" max-width="600px" scrollable
      ><new-company @done="finishedModal"
    /></v-dialog>
    <v-dialog v-model="dialogNewStudent" max-width="600px" scrollable
      ><new-student @done="finishedModal"
    /></v-dialog>
    <v-dialog v-model="dialogNewResume" max-width="600px" scrollable
      ><v-card
        ><v-card-text max-height="50vh"
          ><create-resume
            :activeid="activeUserId"
            @done="finishedModal" /></v-card-text></v-card
    ></v-dialog>
    <v-dialog v-model="dialogNewVacancy" max-width="600px" scrollable
      ><v-card
        ><v-card-text max-height="50vh"
          ><create-vacancy
            :activeid="activeCompanyId"
            @done="finishedModal" /></v-card-text></v-card
    ></v-dialog>
  </div>
</template>

<script>
import ActionCard from '@/atoms/ActionCard.vue'
import CreateVacancy from './CreateVacancy'
import NewCompany from './dialogs/NewCompany'
import NewStudent from './dialogs/NewStudent'
import CreateResume from './CreateResume'
export default {
  name: 'CareerCentre',
  components: {
    CreateVacancy,
    ActionCard,
    NewCompany,
    NewStudent,
    CreateResume,
  },
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dialogNewCompany: false,
      dialogNewVacancy: false,
      dialogNewStudent: false,
      dialogNewResume: false,
      searchUsers: '',
      headersUsers: [
        {
          text: 'Фамилия',
          value: 'last_name',
        },
        {
          text: 'Имя',
          value: 'first_name',
        },
        {
          text: 'Резюме',
          align: 'center',
          value: 'is_filled',
        },

        { text: 'Добавить резюме', align: 'center', value: 'actions' },
      ],
      itemsUsers: [],
      searchVac: '',
      activeCompanyId: 0,
      activeUserId: 0,
      headersVac: [
        {
          text: 'Название',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Компания', value: 'company_name' },
        { text: 'Описание', value: 'short_description' },
        { text: 'Активна', value: 'is_active' },
        { text: 'Подтверждена', value: 'approved' },
        // { text: 'Добавить', align: 'center', value: 'actions' },
      ],
      itemsVac: [],
      searchCompany: '',
      headersCompany: [
        {
          text: 'Компания',
          align: 'start',
          value: 'name',
        },
        {
          text: 'Вакансий',
          align: 'start',
          value: 'vacancies_count',
        },
        {
          text: 'Представитель',
          align: 'start',
          value: 'hr_last_name',
        },

        { text: 'Добавить вакансию', align: 'center', value: 'actions' },
      ],
      itemsCompany: [],
      metrics: [],
    }
  },

  computed: {
    getPercentage() {
      console.log(
        (this.metrics.requests_success / this.metrics.requests_total) * 100
      )
      return (this.metrics.requests_success / this.metrics.requests_total) * 100
    },
  },
  mounted() {
    this.getData()
  },

  methods: {
    finishedModal() {
      this.dialogNewCompany = false
      this.dialogNewVacancy = false
      this.dialogNewStudent = false
      this.dialogNewResume = false
      this.getData()
    },
    openVacancyModal(item) {
      this.activeCompanyId = item.id
      this.dialogNewVacancy = true
    },
    openResumeModal(item) {
      this.activeUserId = item.id
      this.dialogNewResume = true
    },
    getData() {
      //   Promise.all([
      //     getUsers(),
      //     getCompanies(),
      //     getVacancies(),
      //     getMetrics(),
      //   ]).then((values) => {
      //     this.itemsUsers = values[0].data.filter((v) => v.type === 'STUDENT')
      //     this.itemsCompany = values[1].data
      //     this.itemsVac = values[2].data
      //     this.metrics = values[3].data
      //   })
    },
  },
}
</script>

<style scoped>
.table-board {
  border: 1px solid #ddd;
  border-radius: 4px;
}

td a {
  color: rgb(0, 104, 204) !important;
}

.stats {
  text-align: center;
  padding: 30px 0px;
}
</style>
