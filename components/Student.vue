<template>
  <div>
    <v-tabs style="margin-top: 32px" color="#0068CC">
      <v-tab>
        <v-icon left> mdi-account </v-icon>
        Личная информация
      </v-tab>
      <v-tab>
        <v-icon left> mdi-file-account </v-icon>
        Резюме
      </v-tab>
      <v-tab>
        <v-icon left> mdi-eye </v-icon>
        Отклики
      </v-tab>
      <!-- <v-tab>
				<v-icon left>
					mdi-heart
				</v-icon>
				Компании
			</v-tab> -->
      <v-tab-item>
        <div class="mt-8">
          <v-autocomplete
            v-model="user.university_id"
            :items="universities"
            :search-input.sync="search"
            hide-no-data
            hide-selected
            item-text="name"
            item-value="id"
            outlined
            :readonly="disabled"
            label="Университет"
            placeholder="Начните вводить название университета"
            prepend-inner-icon="mdi-domain"
          ></v-autocomplete>
          <v-autocomplete
            v-model="user.specialization"
            :items="specializations"
            hide-no-data
            hide-selected
            item-value="id"
            item-text="name"
            outlined
            :readonly="disabled"
            label="Направление подготовки"
            placeholder="Введите направление"
            prepend-inner-icon="mdi-school"
          ></v-autocomplete>
          <v-text-field
            v-model="user.student_id"
            prepend-inner-icon="mdi-card-account-details"
            label="Табельный номер"
            :readonly="disabled"
            outlined
          ></v-text-field>
          <div class="d-row">
            <v-col class="pd-unset" cols="6"
              ><v-select
                v-model="user.degree"
                outlined
                :readonly="disabled"
                :items="degrees"
                item-text="name"
                item-value="id"
                label="Степень"
              ></v-select
            ></v-col>
            <v-col class="pd-unset" cols="6">
              <v-select
                v-model="user.course"
                :readonly="disabled"
                outlined
                :items="availableCourses"
                label="Курс"
              ></v-select>
            </v-col>
          </div>
        </div>
      </v-tab-item>
      <v-tab-item>
        <v-row>
          <v-col cols="8">
            <div v-if="user.form !== {}">
              <resume-viewer :resume="user.form" />
            </div>
          </v-col>
          <v-col cols="4">
            <div @click="dialog = true">
              <ActionCard
                title="Создать резюме"
                :desc="
                  user.form == {}
                    ? 'Нажмите на карточку, чтобы открыть форму'
                    : 'Новое резюме перезапишет актуальную версию'
                "
              /></div
          ></v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item>
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
        </v-row>
      </v-tab-item>
      <v-tab-item>Сохраненные</v-tab-item>
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

import TCard from '@/atoms/TCard.vue'
import ResumeViewer from './ResumeViewer'
import CreateResume from './CreateResume'
export default {
  name: 'Student',
  components: {
    CreateResume,
    TCard,
    ActionCard,
    ResumeViewer,
  },
  props: {
    specializations: {
      type: Array,
      default: () => [],
    },
    cities: {
      type: Array,
      default: () => [],
    },
    universities: {
      type: Array,
      default: () => [],
    },
    user: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dialog: false,
      degrees: [
        {
          id: 'BACHELOR',
          name: 'Бакалавр',
          courses: [1, 2, 3, 4, 5],
        },
        {
          id: 'MASTER',
          name: 'Магистр',
          courses: [1, 2],
        },
      ],
      search: '',
      disabled: true,
      responses: [],
    }
  },
  computed: {
    availableCourses() {
      return (
        this.degrees &&
        this.degrees.filter((d) => this.user.degree === d.id)[0].courses
      )
    },
  },
  mounted() {
    // Promise.all([
    //   this.$api.universities.universities(),
    //   this.$api.speacializations.specializations(),
    //   this.$api.cities.cities(),
    //   this.$api.requests.getResponses(),
    // ]).then((values) => {
    //   this.universities = values[0].data
    //   this.specializations = values[1].data
    //   this.cities = values[2].data
    //   this.responses = values[3].data
    // })
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
