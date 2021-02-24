<template>
  <v-row class="justify-space-between">
    <v-col cols="12" class="col-md-8">
      <div v-if="responses.length > 0">
        <div
          v-for="r in responses"
          :key="r.vacancy_id"
          class="response mb-2"
          @click="$router.push(`/vacancy?id=${r.vacancy_id}`)"
        >
          <div class="d-row pa-3 align-center justify-space-between">
            <div>
              <h3>{{ r.vacancy_name }}</h3>
              <span class="response__company">в {{ r.company_name }}</span>
            </div>
            <div>
              <span :class="`response__status ${r.response_decision}`">{{
                decision[r.response_decision]
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="mt-auto">
        <placeholder class="my-6" text="Вы еще не откликались на вакансии"
          ><v-btn
            text
            color="primary"
            class="mt-2"
            @click="$router.push('/search')"
            >К поиску</v-btn
          ></placeholder
        >
      </div>
    </v-col>
  </v-row>
</template>

<script>
import Placeholder from '~/atoms/Placeholder.vue'
export default {
  name: 'Invitations',
  components: { Placeholder },
  props: {
    responses: {
      default: () => [],
      type: Array,
    },
  },
  computed: {
    decision() {
      return this.$store.state.utils.decision
    },
  },
}
</script>

<style></style>
