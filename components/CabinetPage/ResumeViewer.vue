<template>
  <div :class="{ 'resume--row': row }">
    <div>
      <h3>Навыки</h3>
      <div class="mt-2 ml-2 d-row" style="margin-top: 24px; gap: 8px">
        <v-chip
          v-for="(chip, i) in form.skills"
          :key="i"
          small
          color="primary"
          >{{ chip.text }}</v-chip
        >
      </div>
    </div>
    <div v-if="form.city" class="mt-8">
      <h3>Город</h3>
      <div class="mt-2 ml-2">
        {{ getCityName }}
      </div>
    </div>
    <div v-if="form.jobs.length" class="mt-8">
      <h3>Опыт работы</h3>
      <div v-for="(job, i) in form.jobs" :key="i" class="mt-2 ml-2">
        <h4>{{ job.name }}</h4>
        <h5 style="color: grey" class="font-weight-regular">
          {{ job.duration }} месяцев
        </h5>
        <p>{{ job.duties[0] }}</p>
      </div>
    </div>
    <div v-if="form.educations.length" class="mt-8">
      <h3>Образование</h3>
      <div v-for="(ed, i) in form.educations" :key="i" class="mt-2 ml-2">
        <h4>{{ ed.university.name }}</h4>
        <h5 style="color: grey" class="font-weight-regular">
          {{ ed.graduate_year }} год выпуска
        </h5>
        <p>{{ ed.specialization.name }}</p>
      </div>
    </div>
    <div v-if="filteredContacts.length" class="mt-8">
      <h3>Контакты</h3>
      <div class="d-row mt-2 ml-2">
        <div v-for="(contact, i) in filteredContacts" :key="i" class="mr-2">
          <a
            style="display: block"
            target="_blank"
            no-prefetch
            :href="getLink(form[contact.id])"
          >
            <v-icon>{{ contact.icon }}</v-icon>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResumeViewer',
  props: {
    row: {
      type: Boolean,
      default: false,
    },
    form: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    getCityName() {
      try {
        return this.cities.filter((city) => city.id === +this.form.city)[0].name
      } catch {
        return 'Нет данных'
      }
    },
    cities() {
      return this.$store.state.utils.cities
    },
    contacts() {
      return this.$store.state.utils.contacts
    },
    filteredContacts() {
      return this.contacts.filter((c) => typeof this.form[c.id] === 'string')
    },
  },
  methods: {
    getLink(link) {
      return link.includes('http') ? link : `https://${link}`
    },
  },
}
</script>

<style>
.resume--row {
  width: 100%;
  justify-content: space-around;
  align-items: baseline;
  display: flex;
  flex-wrap: wrap;
}
</style>
