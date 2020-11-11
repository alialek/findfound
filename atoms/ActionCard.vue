<template>
  <div class="ma-2">
    <v-card class="team-card" flat>
      <v-col class="squared__col pd-unset justify-space-around">
        <div class="justify-space-between d-row team-card__info">
          <v-btn elevation="0" color="primary" fab
            ><v-icon>mdi-plus</v-icon></v-btn
          >
        </div>
        <div style="margin-top: 16px">
          <h4 class="team-card__title">{{ title }}</h4>

          <p class="team-card__company">
            {{ desc }}
          </p>
        </div>
      </v-col>
    </v-card>
  </div>
</template>

<script>
import './TCard.css'
export default {
  name: 'ActionCard',
  props: {
    title: {
      type: String,
      default: '',
    },
    desc: {
      type: String,
      default: '',
    },
  },
}
</script>
<style scoped lang="css">
.team-card {
  border: 1px solid #dddddd !important;
  height: 100%;
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
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */

  letter-spacing: 0.25px;

  /* Black — Medium Emphasis */

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
