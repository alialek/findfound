<template>
  <div style="width: 100%">
    <v-window v-model="step" class="student-window">
      <v-window-item :value="1">
        <v-col cols="12">
          <v-row>
            <ActionCard
              title="Добавить проект"
              :desc="
                projects === []
                  ? 'Чтобы найти людей в команду'
                  : 'Потому что много не бывает'
              "
              @click.native="step = 2"
            />
            <t-card
              v-for="p in projects"
              :id="p.id"
              :key="p.id"
              :title="p.name"
              :description="p.description"
              :logo="p.logo"
              type="project"
            >
              <template v-slot:menu>
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-icon v-on="on">mdi-dots-vertical</v-icon>
                  </template>
                  <v-list dense>
                    <v-list-item color="error" @click="deleteProject(p.id)">
                      <v-list-item-icon>
                        <v-icon>mdi-delete</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>Удалить</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </t-card>
          </v-row></v-col
        >
      </v-window-item>
      <v-window-item :value="2">
        <div class="about-section__heading d-row align-center">
          <v-btn class="d-inline" fab text small @click="step = 1">
            <v-icon color="primary">mdi-arrow-left</v-icon></v-btn
          >
          <h3>Новый проект</h3>
        </div>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12" class="col-md-6">
            <form-field icon="mdi-text" title="Название*">
              <v-text-field
                v-model="project.name"
                :rules="[rules.required]"
                placeholder="FindFound"
                filled
                dense
              ></v-text-field>
            </form-field>

            <form-field icon="mdi-ladder" title="Стадия*">
              <v-select
                v-model="project.state"
                :rules="[rules.required]"
                :items="states"
                dense
                placeholder="Выберите стадию проекта"
                filled
              ></v-select>
            </form-field>

            <form-field icon="mdi-target" title="Отрасль*">
              <v-text-field
                v-model="project.subject"
                :rules="[rules.required]"
                filled
                placeholder="Например, IT"
                dense
              ></v-text-field>
            </form-field>
          </v-col>
          <v-col cols="12" class="col-md-6">
            <form-field icon="mdi-camera" title="Логотип">
              <v-file-input
                v-model="logo"
                accept="image/png, image/jpeg, image/bmp"
                prepend-icon=""
                dense
                filled
                placeholder="Выберите файл"
              >
                <template v-slot:selection="{ text }">
                  <v-chip small label color="primary">
                    {{ text }}
                  </v-chip>
                </template>
              </v-file-input>
            </form-field>
            <form-field icon="mdi-semantic-web" title="Описание*">
              <v-textarea
                v-model="project.description"
                :rules="[rules.required]"
                filled
                placeholder="Опишите идею проекта и вашу миссию"
                dense
              ></v-textarea>
            </form-field>
          </v-col>
        </v-row>
        <div class="about-section__heading">
          <h3>
            Команда
            <span>
              <v-btn
                class="d-inline"
                fab
                text
                small
                @click="manageParticipants('add')"
              >
                <v-icon color="primary">mdi-plus</v-icon></v-btn
              ></span
            >
          </h3>
        </div>
        <v-divider></v-divider>
        <v-row>
          <div
            v-for="(p, id) in project.roles"
            :key="id"
            style="cursor: default"
            class="participant-card d-col mt-6 mb-4 mx-2 pa-6"
          >
            <form-field
              column
              title="Фото участника"
              icon="mdi-badge-account-horizontal"
            >
              <v-file-input
                v-model="p.photo"
                accept="image/png, image/jpeg, image/bmp"
                prepend-icon=""
                dense
                filled
                placeholder="Выберите фото*"
              >
                <template v-slot:selection="{ text }">
                  <v-chip small label color="primary">
                    {{ text }}
                  </v-chip>
                </template>
              </v-file-input>
            </form-field>

            <form-field
              column
              title="Фамилия и имя"
              icon="mdi-badge-account-horizontal"
            >
              <v-text-field
                v-model="p.full_name"
                placeholder="Евдокимов Степан"
                filled
                dense
              ></v-text-field>
            </form-field>
            <form-field column title="Должность" icon="mdi-cog">
              <v-text-field v-model="p.position" placeholder="CEO" filled dense>
              </v-text-field>
            </form-field>
            <form-field
              column
              title="Об участнике"
              placeholder="Добрый, но честный. Любит печеньки в офисе."
              icon="mdi-text-account"
            >
              <v-textarea v-model="p.description" filled dense></v-textarea>
            </form-field>
          </div>

          <div
            v-if="!project.roles.length"
            class="pa-6 mt-6 mb-4 mx-2 d-col align-center new-participant"
            @click="manageParticipants('add')"
          >
            <v-btn elevation="0" color="primary" fab
              ><v-icon>mdi-plus</v-icon></v-btn
            >
            <h4 class="participant-card__title mt-4">Добавить участника</h4>
          </div>
        </v-row>
        <br />
        <v-btn
          class="mt-2 mb-4"
          color="success"
          :disabled="!checkRequired"
          large
          depressed
          @click="sendProject"
          >Создать</v-btn
        >
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
import ActionCard from '@/atoms/ActionCard.vue'
import FormField from '@/atoms/Form-field.vue'
import TCard from '~/atoms/TCard.vue'
export default {
  name: 'Projects',
  components: {
    ActionCard,
    FormField,
    TCard,
  },
  props: {
    projects: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      step: 1,
      states: ['Идея', 'Готовится MVP', 'MVP готов', 'Pre-seed'],
      disabled: {
        project: true,
      },
      logo: null,
      project: {
        name: '',
        state: '',
        subject: '',
        description: '',
        city: 2,
        roles: [],
      },
      requiredProjectFields: ['name', 'description', 'state', 'subject'],
      participant: {
        full_name: '',
        position: '',
        description: '',
        photo: null,
      },
    }
  },
  computed: {
    checkRequired() {
      return this.requiredProjectFields.reduce(
        (acc, val) => acc && Boolean(this.project[val]),
        true
      )
    },
    rules() {
      return this.$store.state.utils.rules
    },
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

    deleteProject(id) {
      this.$api.projects
        .deleteProject(id)
        .then((res) => {
          this.$store.commit('processes/SET_SUCCESS', 'Проект удален')
          this.$store.commit('user/filterUserCompanies', id)
        })
        .catch((err) => {
          console.log(err)
          this.$store.commit('processes/SET_ERROR', 'Произошла ошибка')
        })
    },

    async sendProject() {
      let roles
      try {
        roles = await Promise.all(
          this.project.roles.map(async (role) => {
            delete role.id
            const formData = new FormData()
            formData.append('file', role.photo)

            const { data } = await this.$api.projects.uploadRolePhoto(formData)
            console.log('sd', data)
            const resp = {
              ...role,
              photo: data.file.split(
                'https://findfoundbucket.s3.amazonaws.com/media/'
              )[1],
            }

            return resp
          })
        )
      } catch (err) {
        console.log(err)
        roles = []
      }
      const data = { ...this.project, roles }

      this.$api.projects
        .createProject(data)
        .then((res) => {
          if (this.logo !== null) {
            const formData = new FormData()
            formData.append('file', this.logo)
            this.$api.projects.uploadLogo(res.data.id, formData).then(() => {
              this.step = 1
              this.$emit('refresh')
              this.$store.commit('processes/SET_SUCCESS', 'Проект добавлен')
            })
          } else {
            this.step = 1
            this.$emit('refresh')
            this.$store.commit('processes/SET_SUCCESS', 'Проект добавлен')
          }
        })
        .catch((err) => {
          this.$store.commit('processes/SET_ERROR', err.response.data)
        })
    },
    updateProject() {},
    manageParticipants(type, id) {
      type === 'add'
        ? this.project.roles.push({ ...this.participant, id: Math.random() })
        : (this.project.roles = this.project.roles.filter(
            (role) => role.id !== id
          ))
    },
  },
}
</script>

<style>
.student-window.v-item-group {
  width: 100% !important;
  max-width: unset !important;
}

.new-participant {
  width: 200px;
  height: fit-content;
  border-radius: 4px;
  border: 1px solid #dddddd !important;
  color: #757575;
  cursor: pointer;
}

.participant-card__title {
  font-size: 24px;
  font-family: Gilroy, sans-serif;
  font-style: normal;
  font-weight: 600;
  text-align: center;
}

.participant-card {
  width: 100%;
  border: 1px solid #dddddd !important;
  max-width: 300px;
  border-radius: 4px;
  text-align: center;
}

.participant-card__description {
  text-align: left;
}
.participant-card__chip {
  width: fit-content;
}

@media (max-width: 600px) {
  .participant-card {
    width: 100% !important;
    max-width: unset;
  }
}
</style>
