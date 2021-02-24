<template>
  <section class="about-section">
    <!-- <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar class="mb-1 elevation-0 mt-4">
          <v-text-field
            v-model="search"
            clearable
            flat
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Поиск"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-magnify"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="sortDesc" mandatory>
              <v-btn large depressed :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn large depressed :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <div class="d-row">
          <v-col
            v-for="(item, i) in props.items"
            :key="i"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card class="elevation-0" style="border: 1px solid #ddd">
              <v-card-title class="font-weight-bold">
                {{ item.vacancy_name }}
              </v-card-title>

              <v-divider></v-divider>
              <v-row class="justify-center">
                <v-col class="align-content-center">
                  <v-icon style="font-size: 70px">mdi-account-circle</v-icon>

                  <h3 align="center">
                    {{ item.from_user_name }}
                  </h3>
                </v-col>
              </v-row>
              <v-list dense> </v-list>
              <v-card-actions class="justify-end">
                <v-btn text color="error">Отклонить</v-btn>
                <v-btn depressed color="success">Пригласить</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </div>
      </template>

      <template v-slot:footer>
        <div class="mt-2 d-row justify-space-between align-center">
          <div>
            <span class="grey--text">Показывать</span>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn text class="ml-2" v-bind="attrs" v-on="on">
                  {{ itemsPerPage }}
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(number, index) in itemsPerPageArray"
                  :key="index"
                  @click="updateItemsPerPage(number)"
                >
                  <v-list-item-title>{{ number }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>

          <div>
            <v-btn fab small depressed class="mr-1" @click="formerPage">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <span class="mr-4 grey--text">
              Страница {{ page }} из {{ numberOfPages }}
            </span>
            <v-btn
              fab
              dark
              small
              depressed
              color="blue darken-3"
              class="ml-1"
              @click="nextPage"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </div>
      </template>
    </v-data-iterator> -->
    <div class="d-row">
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Поиск"
        single-line
        filled
        dense
        hide-details
      ></v-text-field>
    </div>
    <v-data-table
      :headers="headers"
      :items="items"
      :single-expand="true"
      item-key="name"
      show-expand
      :search="search"
      @item-expanded="loadResume"
    >
      <template v-slot:item.response_decision="{ item }">
        {{ decision[item.response_decision] }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          text
          depressed
          small
          fab
          color="success"
          @click="sendDecision(item.response_id, 'ACCEPT')"
        >
          <v-icon>mdi-check</v-icon></v-btn
        >
        <v-btn
          text
          depressed
          small
          fab
          color="error"
          @click="sendDecision(item.response_id, 'DECLINE')"
        >
          <v-icon>mdi-window-close</v-icon></v-btn
        >
      </template>
      <template v-slot:expanded-item="{ item }">
        <td :colspan="headers.length">
          <v-progress-circular
            v-if="isLoading"
            indeterminate
            color="primary"
            class="mx-auto"
          ></v-progress-circular>

          <v-row
            v-else-if="typeof extendedResumees[item.response_id] === 'string'"
            class="justify-center"
          >
            {{ extendedResumees[item.response_id] }}
            <span class="small-header">Email: {{ item.from_user_email }}</span>
          </v-row>
          <v-row
            v-else-if="typeof extendedResumees[item.response_id] === 'object'"
            style="width: 100%"
          >
            <resume-viewer row :form="extendedResumees[item.response_id]" />
          </v-row>
        </td> </template
    ></v-data-table>
  </section>
</template>

<script>
import ResumeViewer from '../CabinetPage/ResumeViewer.vue'
export default {
  name: 'ResponsesView',
  components: { ResumeViewer },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      itemsPerPageArray: [10, 20, 50, 100],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      extendedResumees: {},
      isLoading: false,
      itemsPerPage: 4,
      sortBy: 'response_seen',
      headers: [
        {
          text: 'Имя',
          value: 'from_user_name',
        },
        {
          text: 'Вакансия',
          value: 'vacancy_name',
        },
        {
          text: 'Почта',
          value: 'from_user_email',
        },

        {
          text: 'Статус',
          value: 'response_decision',
        },

        {
          text: 'Действия',
          value: 'actions',
          sortable: false,
        },
        { text: '', value: 'data-table-expand' },
      ],
    }
  },
  computed: {
    decision() {
      return this.$store.state.utils.decision
    },
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
  },
  methods: {
    sendDecision(id, decision) {
      this.$api.invitations
        .respondInvitationById(id, { decision })
        .then((res) => {
          this.$store.commit('project/updateDecision', { id, decision })
          this.$store.commit(
            'processes/SET_SUCCESS',
            decision === 'ACCEPT'
              ? 'Приглашение отправлено, не забудьте связаться с кандидатом'
              : 'Отказ отправлен'
          )
        })
        .catch(() => {
          this.$store.commit('processes/SET_ERROR', 'Ошибка')
        })
    },

    loadResume(response) {
      if (response.value) {
        this.isLoading = true
        this.$api.forms
          .getFormById(response.item.from_user_id)
          .then((res) => {
            this.extendedResumees[response.item.response_id] = res.data
          })
          .catch((err) => {
            try {
              if (err.response.data.detail === 'Not found.')
                this.extendedResumees[response.item.response_id] =
                  'Пользователь не заполнил резюме'
            } catch {
              this.extendedResumees[response.item.response_id] = 'Ошибка'
            }
          })
          .finally(() => (this.isLoading = false))
      }
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number
    },
  },
}
</script>

<style></style>
