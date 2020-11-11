<template>
  <v-card class="pt-8">
    <v-card-text max-height="50vh">
      <v-form>
        <v-text-field
          v-model="company.name"
          :rules="[rules.required]"
          prepend-inner-icon="mdi-card-account-details"
          label="Название компании"
          outlined
        ></v-text-field>
        <v-textarea v-model="company.description" outlined label="Описание">
        </v-textarea>
        <v-combobox
          v-model="company.city"
          :items="cities"
          outlined
          item-text="name"
          item-value="id"
          label="Выберите город"
        ></v-combobox>
        <v-text-field
          v-model="company.inn"
          :rules="[rules.required]"
          prepend-inner-icon="mdi-card-account-details"
          label="ИНН"
          outlined
        ></v-text-field>

        <v-text-field
          v-model="company.ogrn"
          :rules="[rules.required]"
          prepend-inner-icon="mdi-card-account-details"
          label="ОГРН"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="company.address"
          :rules="[rules.required]"
          prepend-inner-icon="mdi-card-account-details"
          label="Адрес"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="company.phone"
          :rules="[rules.required]"
          prepend-inner-icon="mdi-card-account-details"
          label="Номер телефона"
          outlined
        ></v-text-field>

        <v-file-input
          v-model="company.logo"
          outlined
          label="Логотип"
          placholder="PNG, JPG 256x256"
          @change="Preview_image"
        >
        </v-file-input>
        <v-img
          :style="`width:100px;height: 100px; background-size: contain; background-image: url(${company.logo});`"
        ></v-img>
        <v-checkbox v-model="company.takes_on_practice">
          <template v-slot:label> Готовы предоставить практику </template>
        </v-checkbox>
        <v-btn
          color="primary"
          large
          block
          elevation="0"
          full-width
          @click="sendCompany"
        >
          Зарегистрироваться
        </v-btn>
      </v-form></v-card-text
    >
  </v-card>
</template>

<script>
import { cities, createCompany } from '../../api'
export default {
  name: 'NewCompany',
  data() {
    return {
      rules: {
        required: (value) => !!value || 'Обязательное поле',
        min: (v) => v.length >= 8 || 'Минимум 8 символов',
      },

      cities: [],
      company: {
        logo: '',
        phone: '+79117653927',
        inn: '23423423',
        name: 'Selectel',
        ogrn: '8273282828724',
        takes_on_practice: false,
        address: 'Цветочная ул., д.19',
        city: '',
        description: 'Сеть дата-центров',
      },
    }
  },
  mounted() {
    cities().then((res) => (this.cities = res.data))
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
    sendCompany() {
      createCompany({ ...this.company, city: this.company.city.id }).then(
        (res) => {
          this.$store.commit('processes/SET_SUCCESS', 'Компания создана!')
          this.$emit('done')
        }
      )
    },
  },
}
</script>

<style></style>
