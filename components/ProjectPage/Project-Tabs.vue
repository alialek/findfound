<template>
  <div>
    <v-tabs style="margin-top: 32px" color="#0068CC">
      <v-tab>
        <v-icon left> mdi-account </v-icon>
        Вакансии и отклики
      </v-tab>
      <v-tab>
        <v-icon left> mdi-lock </v-icon>
        Создать вакансию
      </v-tab>
      <v-tab-item>
        <v-expansion-panels
          v-if="vacancies.length > 0"
          style="margin-top: 16px"
          flat
          elevation="0"
        >
          <v-expansion-panel
            v-for="(vacancy, i) in responses"
            :key="i"
            flat
            elevation="0"
          >
            <v-expansion-panel-header elevation="0">
              {{ vacancy.name }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <span class="caption"
                >Описание: {{ vacancy.short_description }} <br /><router-link
                  class="caption"
                  :to="`vacancy?id=${vacancy.id}`"
                  >Ссылка на вакансию</router-link
                ></span
              >

              <v-list subheader>
                <div v-if="responses">
                  Отклики

                  <v-list-item
                    v-for="response in vacancy.responses"
                    :key="response.response_id"
                    dense
                  >
                    <v-row
                      style="cursor: pointer"
                      @click="
                        $router.push(`/profile?id=${response.student_id}`)
                      "
                    >
                      <v-list-item-avatar>
                        <v-icon>mdi-account</v-icon>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>{{
                          response.student_name
                        }}</v-list-item-title>
                      </v-list-item-content>
                    </v-row>

                    <v-list-item-icon>
                      <v-btn
                        depressed
                        small
                        class="mr-2"
                        color="primary"
                        @click="
                          sendDecision(response.response_id, 'ACCEPT', '')
                        "
                      >
                        Пригласить
                      </v-btn>
                      <v-btn
                        depressed
                        small
                        color="error"
                        @click="
                          sendDecision(response.response_id, 'DECLINE', '')
                        "
                      >
                        Отклонить
                      </v-btn>
                    </v-list-item-icon>
                  </v-list-item>
                </div>
                <div v-else>
                  <p class="caption">Откликов еще нет</p>
                </div>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-row v-else class="justify-center">
          <v-col class="align-center">
            <v-icon style="font-size: 40px">mdi-alert-circle-outline</v-icon>
            <div>Вакансии отсутствуют</div>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item>
        <div @click="dialog = true">
          <ActionCard
            title="Создать вакансию"
            desc="Нажмите на карточку, чтобы открыть форму"
            @done=";(dialog = false), $emit('refresh')"
          />
        </div>
      </v-tab-item>
    </v-tabs>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <create-vacancy />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ActionCard from '@/atoms/ActionCard.vue'
import CreateVacancy from '@/components/CreateVacancy'

export default {
  name: 'Project',
  components: {
    CreateVacancy,
    ActionCard,
  },
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dialog: false,
      responses: [],
    }
  },
  computed: {
    vacancies() {
      return this.$store.state.vacancies.vacancies
    },
  },
  methods: {
    sendDecision(id, decision, comment) {
      console.log(id, decision, comment)
      this.$api.invitations.sendInvitiation({ vacancy_id: id }).then((res) => {
        this.$commit(
          'processes/SET_SUCCESS',
          decision === 'ACCEPT'
            ? 'Приглашение отправлено'
            : 'Пользователю отправлен отказ'
        )
      })
    },
  },
}
</script>

<style scoped>
.editorx_body {
  border: 1px solid #ddd;
  padding: 8px 16px;
  border-radius: 10px;
}
</style>
