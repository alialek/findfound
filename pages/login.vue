<template>
  <v-row class="pd-unset d-row auth">
    <v-col
      class="d-col col-12 col-sm-12 col-md-6 pd-unset justify-center align-center auth__col"
    >
      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card elevation="0" class="auth__card pa-8">
            <h1 class="text-h4 text-center font-weight-black mb-4">Вход</h1>
            <v-form>
              <v-text-field
                v-model="login.email"
                autocomplete="email"
                prepend-inner-icon="mdi-email"
                label="Email"
                class="mt-8"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="login.password"
                label="Пароль"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                prepend-inner-icon="mdi-key"
                autocomplete="current-password"
                outlined
                @click:append="show1 = !show1"
              ></v-text-field>
              <v-btn
                color="primary"
                large
                block
                elevation="0"
                full-width
                @click="authenticate"
              >
                Войти
              </v-btn>
            </v-form>
            <a class="mt-8 link text-center d-block" @click="step++"
              >Зарегистрироваться</a
            >
          </v-card>
        </v-window-item>

        <v-window-item :value="2">
          <v-card elevation="0" class="auth__card pa-8">
            <div class="d-row justify-space-between align-baseline">
              <v-icon class="auth__back-icon" @click="step--"
                >mdi-arrow-left</v-icon
              >
              <h1 class="text-h4 text-center d-block font-weight-black mb-4">
                Регистрация
              </h1>
              <div></div>
            </div>

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
              Дата рождения <br />
              <br />
              <vc-date-picker
                v-model="registration.date_of_birth"
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

              <div class="d-row justify-end mt-6">
                <v-btn color="primary" outlined elevation="0" @click="register">
                  Зарегистрироваться
                </v-btn>
              </div>
            </v-form>
          </v-card>
        </v-window-item>
      </v-window>
    </v-col>
    <v-col
      cols="6"
      class="d-col d-none d-sm-none d-md-flex pd-unset auth__image"
    >
    </v-col>
  </v-row>
</template>

<script>
import './Auth.css'

export default {
  name: 'Auth',
  data() {
    return {
      step: 1,
      show2: false,
      show1: false,
      menu2: false,
      image: '',
      width: 300,
      registration: {
        password: '123123789',
        rePassword: '123123789',
        first_name: 'Александр',
        last_name: 'Алибутаев',
        telegram: '',
        sex: 'MALE',
        email: 'alialek@yandex.ru',
        date_of_birth: new Date(),
      },
      rules: {
        required: (value) => !!value || 'Обязательное поле',
        min: (v) => v.length >= 8 || 'Минимум 8 символов',
      },

      login: {
        email: '',
        password: '',
      },
    }
  },

  computed: {
    isAvailable() {
      let result = false
      if (this.step === 2)
        result = Object.keys(this.registration).reduce((acc, val) => {
          return acc && this.registration[val]
        }, true)

      return result
    },
    passwordConfirmationRule() {
      return () => this.password === this.rePassword || 'Пароли не совпадают'
    },
  },
  watch: {
    step(val) {
      this.show1 = false
      this.show2 = false
    },
  },
  mounted() {
    try {
      this.width = this.$refs.autocom.$el.getBoundingClientRect().width
    } catch (err) {}
  },
  methods: {
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })
    },
    async Preview_image(par) {
      this.company.logo = await this.toBase64(par)
    },
    concateText: (item) => item.code + ' — ' + item.name,
    authenticate() {
      this.$api.auth
        .login(this.login)
        .then((res) => {
          this.saveCreds(res)
        })
        .catch(() => {
          this.$store.commit('processes/SET_ERROR', 'Введенные данные неверны')
        })
    },
    register() {
      const data = Object.assign({}, this.registration)
      data.date_of_birth = `${this.registration.date_of_birth.getFullYear()}-${this.registration.date_of_birth.getMonth()}-${this.registration.date_of_birth.getDate()}`
      delete data.rePassword
      this.$api.users.registration(data).then((res) => {
        this.$store.commit('processes/SET_SUCCESS', 'Регистрация пройдена!')
        this.saveCreds(res)
        this.$router.push('/')
      })
    },
    saveCreds(res) {
      localStorage.setItem('user_ff', res.data.token)
      localStorage.setItem('role_ff', res.data.type)
    },
  },
}
</script>

<style lang="css" scoped>
.auth__card {
  border: 1px solid #dddddd;
}
</style>
