<template>
  <v-row class="pd-unset d-row auth">
    <v-col
      class="d-col col-12 col-sm-12 pd-unset justify-center align-center auth__col"
    >
      <v-card elevation="0" class="auth__card">
        <v-window v-model="step">
          <v-window-item :value="1">
            <h1 class="text-h4 text-center font-weight-bold mb-4">Вход</h1>
            <v-form>
              <form-field
                column
                max-width="100%"
                class="pd-unset"
                style="padding-top: 8px"
                title="Эл.почта"
                icon="mdi-email"
              >
                <v-text-field
                  v-model="login.email"
                  autocomplete="email"
                  placeholder="email@gmail.com"
                  :dense="!$vuetify.breakpoint.mdAndUp"
                  filled
                ></v-text-field
              ></form-field>
              <form-field
                column
                max-width="100%"
                class="mt-n4 pd-unset"
                style="padding-top: 8px"
                title="Пароль"
                icon="mdi-key"
              >
                <v-text-field
                  v-model="login.password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  autocomplete="current-password"
                  filled
                  placeholder="Пароль"
                  :dense="!$vuetify.breakpoint.mdAndUp"
                  @click:append="show1 = !show1"
                ></v-text-field>
              </form-field>
              <v-btn :href="VKAuthLink" text block elevation="0">
                <v-icon color="#2787F5">mdi-vk</v-icon> Вход с VK
              </v-btn>
              <v-btn
                class="mt-4"
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

            <v-row class="justify-space-between mx-1">
              <a class="mt-8 link text-center d-block" @click="step++"
                >Регистрация</a
              >
              <a class="mt-8 link text-center d-block">Забыли пароль?</a>
            </v-row>
          </v-window-item>

          <v-window-item :value="2">
            <div class="d-row justify-space-between align-baseline">
              <v-icon class="auth__back-icon" @click="step--"
                >mdi-arrow-left</v-icon
              >
              <h1 class="text-h4 text-center d-block font-weight-bold mb-4">
                Регистрация
              </h1>
              <div></div>
            </div>

            <v-form сlass="mt-8">
              <form-field
                column
                max-width="100%"
                class="pd-unset"
                title="Email"
                icon="mdi-email"
              >
                <v-text-field
                  v-model="registration.email"
                  :dense="!$vuetify.breakpoint.mdAndUp"
                  autocomplete="email"
                  placeholder="pavel@durov.com"
                  :rules="[rules.required, rules.email]"
                  filled
                ></v-text-field>
              </form-field>
              <form-field
                column
                max-width="100%"
                class="pd-unset"
                title="Пароль"
                icon="mdi-key"
              >
                <v-text-field
                  v-model="registration.password"
                  autocomplete="current-password"
                  filled
                  :dense="!$vuetify.breakpoint.mdAndUp"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                ></v-text-field>
              </form-field>
              <form-field
                column
                max-width="100%"
                class="pd-unset"
                title="Повторите пароль"
                icon="mdi-key"
              >
                <v-text-field
                  v-model="registration.rePassword"
                  autocomplete="current-password"
                  filled
                  :dense="!$vuetify.breakpoint.mdAndUp"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min, passwordConfirmationRule]"
                  :type="show2 ? 'text' : 'password'"
                  @click:append="show2 = !show2"
                ></v-text-field>
              </form-field>
              <div class="d-row justify-end mt-6">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      color="primary"
                      block
                      outlined
                      :disabled="!enableStep2"
                      elevation="0"
                      v-on="on"
                      @click="step++"
                    >
                      Далее
                    </v-btn>
                  </template>
                  <span>{{
                    !enableStep2
                      ? 'Допущены ошибки при заполнении формы'
                      : 'К следующему шагу'
                  }}</span>
                </v-tooltip>
              </div>
            </v-form>
          </v-window-item>
          <v-window-item :value="3">
            <div class="d-row justify-space-between align-baseline">
              <v-icon class="auth__back-icon" @click="step--"
                >mdi-arrow-left</v-icon
              >
              <h1 class="text-h4 text-center d-block font-weight-bold mb-4">
                Регистрация
              </h1>
              <div></div>
            </div>
            <form-field
              column
              max-width="100%"
              class="pd-unset"
              style="padding-top: 8px"
              title="Имя"
              icon="mdi-account"
            >
              <v-text-field
                v-model="registration.first_name"
                :rules="[rules.required]"
                autocomplete="false"
                filled
                placeholder="Артем"
                :dense="!$vuetify.breakpoint.mdAndUp"
              ></v-text-field>
            </form-field>
            <form-field
              column
              max-width="100%"
              class="pd-unset"
              title="Фамилия"
              icon="mdi-account"
            >
              <v-text-field
                v-model="registration.last_name"
                autocomplete="false"
                :rules="[rules.required]"
                filled
                placeholder="Лебедев"
                :dense="!$vuetify.breakpoint.mdAndUp"
              ></v-text-field>
            </form-field>

            <form-field
              column
              max-width="100%"
              class="pd-unset"
              title="Выберите пол"
              icon="mdi-check-circle-outline"
            >
              <v-select
                v-model="registration.sex"
                :items="sexValues"
                filled
                placeholder="Выберите пол"
                :rules="[rules.required]"
                :dense="!$vuetify.breakpoint.mdAndUp"
                :return-object="false"
              >
              </v-select>
            </form-field>
            <form-field
              column
              max-width="100%"
              class="pd-unset"
              title="Дата рождения"
              icon="mdi-calendar"
            >
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
            </form-field>

            <div class="d-row justify-end mt-6">
              <v-btn
                color="primary"
                block
                :disabled="isAvailable"
                outlined
                elevation="0"
                @click="register"
              >
                Зарегистрироваться
              </v-btn>
            </div>
          </v-window-item>
        </v-window>
      </v-card>

      <!-- <div
        class="rocket"
        style="
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          z-index: 0;
        "
      >
        <img style="height: 200px" src="/img/rocket.png" alt="Ракета" />
      </div> -->
    </v-col>
  </v-row>
</template>

<script>
import FormField from '~/atoms/Form-field.vue'
import './Auth.css'

export default {
  name: 'Auth',
  components: {
    FormField,
  },
  data() {
    return {
      step: 1,
      show2: false,
      show1: false,
      menu2: false,
      image: '',
      width: 300,
      registration: {
        password: '',
        rePassword: '',
        first_name: '',
        last_name: '',
        sex: '',
        email: '',
        date_of_birth: new Date(),
      },

      login: {
        email: '',
        password: '',
      },
    }
  },

  computed: {
    VKAuthLink() {
      return `https://oauth.vk.com/authorize?client_id=7769567&redirect_uri=${window.location.origin}/login&display=page&scope=email&response_type=code&v=5.130`
    },
    enableStep2() {
      return ['email', 'password', 'rePassword'].reduce((prev, cur) => {
        let result
        switch (cur) {
          case 'password':
            result =
              typeof this.rules.required(this.registration[cur]) ===
                'boolean' &&
              typeof this.rules.min(this.registration[cur]) === 'boolean' &&
              this.password === this.rePassword

            break
          case 'email':
            result =
              typeof this.rules.required(this.registration[cur]) ===
                'boolean' &&
              typeof this.rules.email(this.registration[cur]) === 'boolean'

            break
          default:
            result =
              typeof this.rules.required(this.registration[cur]) === 'boolean'
            break
        }
        return result && prev
      }, true)
    },
    sexValues() {
      return this.$store.state.utils.sex
    },
    rules() {
      return this.$store.state.utils.rules
    },
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
    if (this.$route.query.tab) this.step = 2
    if (this.$route.query.code) {
      this.$api.auth
        .VKAuth(this.$route.query.code)
        .then((res) => {
          this.$store.commit('processes/SET_SUCCESS', 'Регистрация пройдена!')
          this.saveCreds(res)
        })
        .catch(() => {
          this.$store.commit('processes/SET_SUCCESS', 'Ошибка входа через VK')
        })
    }
    if (this.$route.query.error) {
      console.log(this.$route.query.error_descrpiption)
    }
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
      delete data.rePassword

      data.date_of_birth = this.$helpers.formatDate(data.date_of_birth)

      this.$api.users
        .registration(data)
        .then((res) => {
          this.$store.commit('processes/SET_SUCCESS', 'Регистрация пройдена!')
          this.saveCreds(res)
        })
        .catch((err) => {
          console.log(err)
          this.$store.commit(
            'processes/SET_SUCCESS',
            Object.values(err.response.data).join(', ')
          )
        })
    },
    saveCreds(res) {
      localStorage.setItem('user_ff', res.data.token)
      localStorage.setItem('role_ff', res.data.type)
      this.$router.push('/')
      setTimeout(() => {
        window.location.reload()
      }, 500)
    },
  },
}
</script>
