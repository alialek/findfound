<template>
  <v-card class="pa-4">
    <v-card-text max-height="50vh">
      <v-form сlass="mt-8">
        <v-text-field
          v-model="registration.first_name"
          autocomplete="false"
          outlined
          label="Имя"
          prepend-inner-icon="mdi-account"
        ></v-text-field>
        <v-text-field
          v-model="registration.last_name"
          autocomplete="false"
          outlined
          label="Фамилия"
          prepend-inner-icon="mdi-account"
        ></v-text-field>
        <v-text-field
          v-model="registration.email"
          autocomplete="email"
          prepend-inner-icon="mdi-email"
          label="Email"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="registration.telegram"
          prepend-inner-icon="mdi-telegram"
          label="Никнейм в телеграме"
          outlined
        ></v-text-field>

        <v-text-field
          v-model="registration.password"
          autocomplete="current-password"
          outlined
          label="Пароль"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          prepend-inner-icon="mdi-key"
          @click:append="show1 = !show1"
        ></v-text-field>
        <v-text-field
          v-model="registration.rePassword"
          autocomplete="current-password"
          outlined
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min, passwordConfirmationRule]"
          :type="show2 ? 'text' : 'password'"
          label="Повторите пароль"
          prepend-inner-icon="mdi-key"
          @click:append="show2 = !show2"
        ></v-text-field>
        Выберите пол
        <v-radio-group v-model="registration.sex">
          <v-radio value="MALE">
            <template v-slot:label>
              <div>Мужской</div>
            </template>
          </v-radio>
          <v-radio value="FEMALE">
            <template v-slot:label>
              <div>Женский</div>
            </template>
          </v-radio>
        </v-radio-group>
        Дата рождения
        <vc-date-picker v-model="registration.date_of_birth" class="pt-2">
        </vc-date-picker>
        <v-autocomplete
          ref="autocom"
          v-model="registration.university_id"
          :items="universities"
          :search-input.sync="search"
          :menu-props="{
            maxWidth: width,
            overflowX: false,
          }"
          hide-no-data
          hide-selected
          class="mt-8"
          item-text="name"
          item-value="id"
          outlined
          :rules="[rules.required]"
          label="Университет"
          placeholder="Начните вводить название университета"
          prepend-inner-icon="mdi-domain"
        ></v-autocomplete>
        <v-autocomplete
          v-model="registration.specialization"
          :items="specializations"
          :search-input.sync="search_spec"
          :menu-props="{
            maxWidth: width,
            overflowX: false,
          }"
          hide-no-data
          hide-selected
          :rules="[rules.required]"
          :item-text="concateText"
          item-value="id"
          outlined
          label="Направление подготовки"
          placeholder="Введите направление"
          prepend-inner-icon="mdi-school"
        ></v-autocomplete>
        Статус
        <v-radio-group
          v-model="registration.student_id_type"
          :rules="[rules.required]"
        >
          <v-radio value="TAB">
            <template v-slot:label>
              <div>Студент</div>
            </template>
          </v-radio>
          <v-radio value="DIPLOMA">
            <template v-slot:label>
              <div>Выпусник</div>
            </template>
          </v-radio>
        </v-radio-group>
        <div v-if="registration.student_id_type === 'TAB'">
          <v-text-field
            v-model="registration.student_id"
            :rules="[rules.required]"
            prepend-inner-icon="mdi-card-account-details"
            label="Табельный номер"
            outlined
          ></v-text-field>
          <div class="d-row">
            <v-col class="pd-unset" cols="6"
              ><v-select
                v-model="registration.degree"
                :rules="[rules.required]"
                outlined
                :items="degrees"
                item-text="name"
                item-value="id"
                label="Степень"
              ></v-select
            ></v-col>
            <v-col class="pd-unset" cols="6">
              <v-select
                v-if="registration.degree"
                v-model="registration.course"
                outlined
                :rules="[rules.required]"
                :items="availableCourses"
                label="Курс"
              ></v-select>
            </v-col>
          </div>
        </div>
        <v-text-field
          v-if="registration.student_id_type === 'GRADUATE'"
          v-model="registration.student_id"
          prepend-inner-icon="mdi-card-account-details"
          label="Номер диплома"
          :rules="[rules.required]"
          outlined
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions class="pt-4">
      <v-btn
        color="primary"
        large
        block
        elevation="0"
        full-width
        @click="register"
      >
        Зарегистрироваться
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { cities, specializations, universities, registration } from '../../api'

export default {
  name: 'NewStudent',
  data() {
    return {
      cities: [],
      rules: {
        required: (value) => !!value || 'Обязательное поле',
        min: (v) => v.length >= 8 || 'Минимум 8 символов',
      },
      search_spec: '',
      width: 300,
      specializations: [],
      universities: [],
      show1: false,
      show2: false,
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
      registration: {
        type: 'STUDENT',
        password: '123123789',
        rePassword: '123123789',
        first_name: 'Александр',
        last_name: 'Алибутаев',
        degree: '',
        course: 0,
        telegram: '',
        sex: 'MALE',
        student_id: '',
        student_id_type: '',
        email: 'alialek@yandex.ru',
        university_id: 0,
        specialization: 1,
        date_of_birth: new Date(),
      },
    }
  },
  computed: {
    passwordConfirmationRule() {
      return () => this.password === this.rePassword || 'Пароли не совпадают'
    },
    availableCourses() {
      return this.degrees.filter((d) => this.registration.degree === d.id)[0]
        .courses
    },
  },
  mounted() {
    Promise.all([universities(), specializations(), cities()]).then(
      (values) => {
        this.universities = values[0].data

        this.specializations = values[1].data
        this.cities = values[2].data
      }
    )
    try {
      this.width = this.$refs.autocom.$el.getBoundingClientRect().width
    } catch (err) {}
  },
  methods: {
    register() {
      const data = Object.assign({}, this.registration)
      data.date_of_birth = `${this.registration.date_of_birth.getFullYear()}-${this.registration.date_of_birth.getMonth()}-${this.registration.date_of_birth.getDate()}`
      delete data.rePassword
      registration(data).then((res) => {
        this.$store.commit('processes/SET_SUCCESS', 'Студент зарегистрирован')

        this.$emit('done')
      })
    },
    concateText: (item) => item.code + ' — ' + item.name,
  },
}
</script>

<style></style>
