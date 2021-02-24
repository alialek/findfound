<template>
  <div class="participant-card d-col mt-6 mx-2">
    <v-col class="squared__col pd-unset justify-space-around">
      <div class="justify-space-between d-row participant-card__info">
        <div
          alt="photo"
          class="participant-card__logo"
          :style="{
            backgroundImage: `url(https://findfoundbucket.s3.amazonaws.com/media/${photo})`,
          }"
        />
      </div>
      <div class="participant-card__title">
        <h4>
          {{ fullName }}
        </h4>
        <v-chip
          color="primary"
          class="ml-2"
          style="width: fit-content; border-radius: 3px; margin-bottom: 0px"
          small
          >{{ position }}</v-chip
        >
      </div>
      <p class="participant-card__description">{{ description }}</p>
    </v-col>
  </div>
</template>

<script>
import './Participant-card.css'
export default {
  name: 'ParticipantCard',
  props: {
    position: {
      type: String,
      default: '',
    },
    fullName: {
      type: String,
      default: '',
    },
    photo: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
}
</script>
