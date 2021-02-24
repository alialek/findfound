<template>
  <div class="team-card__holder ma-2">
    <v-card class="team-card" flat>
      <v-col class="squared__col pd-unset justify-space-around">
        <div class="justify-space-between align-start d-row team-card__info">
          <div
            v-if="logo !== ''"
            alt="logo"
            class="team-card__logo"
            :style="{
              backgroundImage: `url(https://findfoundbucket.s3.amazonaws.com/media/${logo})`,
            }"
          />
          <v-icon v-else alt="logo" size="56" class="team-card__logo"
            >mdi-domain</v-icon
          >
          <slot style="width: fit-content" name="menu"></slot>
        </div>
        <div>
          <nuxt-link :to="`/${type}?id=${id}`">
            <h4
              class="team-card__title"
              :style="{ marginBottom: company.length && '0' }"
            >
              {{ title }}
            </h4></nuxt-link
          >
          <nuxt-link v-if="company !== ''" :to="`/project?id=${companyId}`">
            <p class="team-card__company">
              {{ company }}
              <v-icon v-if="verified" style="font-size: 20px"
                >mdi-check-circle</v-icon
              >
            </p></nuxt-link
          >
        </div>

        <nuxt-link :to="`/${type}?id=${id}`">
          <div>
            <p class="team-card__caption">
              {{ description }}
            </p>
          </div>
        </nuxt-link>
        <div v-if="skills.length > 0" class="d-row">
          <div
            v-for="skill in skills"
            :key="skill.id"
            class="mr-2 mt-2 custom-chip"
          >
            {{ skill.text }}
          </div>
        </div>
      </v-col>
    </v-card>
  </div>
</template>

<script>
import './TCard.css'
export default {
  name: 'TCard',
  props: {
    logo: {
      default: '',
      type: String,
    },
    link: {
      default: '',
      type: String,
    },
    title: {
      default: 'Название',
      type: String,
    },
    company: {
      default: '',
      type: String,
    },
    companyId: {
      default: '0',
      type: String,
    },
    tags: {
      type: Array,
      default: () => [],
    },
    description: {
      default: '',
      type: String,
    },
    type: {
      default: 'vacancy', // vacancy or project
      type: String,
      required: false,
    },
    id: {
      default: 0,
      type: Number,
    },
    status: {
      type: Boolean,
      default: false,
    },
    decision: {
      default: 'Отказ',
      type: String,
    },
    seen: {
      type: Boolean,
      default: false,
    },
    skills: {
      type: Array,
      default: () => [],
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {},
}
</script>
<style lang="css">
.team-card {
  border: 1px solid #dddddd !important;
  height: 100%;
}
.team-card:hover {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12) !important;
}

/* .custom-chip {
  border: 1px solid #dddddd;
  box-sizing: border-box;
  border-radius: 100px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;

  letter-spacing: 0.25px;

  color: rgba(0, 0, 0, 0.6);
  mix-blend-mode: normal;
  padding: 4px 8px;
  height: fit-content;
  white-space: nowrap;

  overflow: hidden;
  width: fit-content;
  margin-top: 8px;
} */
</style>
