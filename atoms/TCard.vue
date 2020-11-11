<template>
  <div class="ma-2">
    <v-card class="team-card" flat>
      <v-col class="squared__col pd-unset justify-space-around">
        <div class="justify-space-between d-row team-card__info">
          <div
            alt="logo"
            class="team-card__logo"
            :style="{ backgroundImage: `url(${logo})` }"
          />
          <div v-if="external" class="team-card__external">superjob</div>
        </div>
        <div v-if="!external">
          <nuxt-link :to="`/vacancy?id=${id}`">
            <h4 class="team-card__title">{{ title }}</h4></nuxt-link
          >
          <nuxt-link :to="`/company?id=${companyId}`">
            <p class="team-card__company">
              {{ company }}
              <v-icon v-if="verified" style="font-size: 20px"
                >mdi-check-circle</v-icon
              >
            </p></nuxt-link
          >
        </div>
        <a v-if="external" target="_blank" :href="link">
          <h4 class="team-card__title">{{ title }}</h4>

          <p class="team-card__company">
            {{ company }}
            <v-icon v-if="verified" style="font-size: 20px"
              >mdi-check-circle</v-icon
            >
          </p>
        </a>
        <nuxt-link v-if="!external" :to="`/vacancy?id=${id}`">
          <div>
            <p class="team-card__caption">
              {{ description }}
            </p>
          </div>
        </nuxt-link>
        <a v-if="external" target="_blank" :href="link">
          <div>
            <p class="team-card__caption">
              {{ description }}
            </p>
          </div>
        </a>
        <v-row v-if="skills.length > 0">
          <div
            v-for="skill in skills"
            :key="skill.id"
            class="mr-2 ml-2 custom-chip"
          >
            {{ skill.text }}
          </div>
        </v-row>
        <v-row v-if="skills.length === 0">
          <div v-if="decision === 'NO_ANSWER'" class="mr-2 ml-2 custom-chip">
            Не просмотрено
          </div>
          <div class="mr-2 ml-2">
            <v-chip v-if="decision === 'ACCEPT'" color="success" outlined>
              <v-icon left> mdi-check </v-icon>
              Вас пригласили
            </v-chip>
            <v-chip v-if="decision === 'DECLINE'" color="error" outlined>
              <v-icon left> mdi-close </v-icon>
              Отказ
            </v-chip>
          </div>
        </v-row>
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
      default: 'Компания',
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
      default: 'Описание',
      type: String,
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

    external: {
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

.team-card__external {
  background: rgba(0, 130, 255, 0.12);
  border-radius: 24px;
  font-family: Noto Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  letter-spacing: 0.25px;
  color: #0068cc;
  padding: 6px 12px;
  height: 30px;
}

.custom-chip {
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
}
</style>
