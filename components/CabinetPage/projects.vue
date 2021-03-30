<template>
  <div style="width: 100%">
    <v-window v-model="step" class="student-window">
      <v-window-item :value="1">
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
                  <v-list-item @click="editProjectLogo(p.id)">
                    <v-list-item-icon>
                      <v-icon>mdi-camera</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Изменить логотип</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="editProject(p.id)">
                    <v-list-item-icon>
                      <v-icon>mdi-pencil</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Редактировать</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="deleteProject(p.id)">
                    <v-list-item-icon>
                      <v-icon color="error">mdi-delete</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title color="error">Удалить</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </t-card>
        </v-row>
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

            <form-field title="Город" icon="mdi-city">
              <v-combobox
                v-model="project.city"
                :items="cities"
                :search-input="searchCity"
                hide-no-data
                hide-selected
                item-text="name"
                item-value="id"
                filled
                return-object
                dense
                placeholder="Начните вводить название"
              ></v-combobox>
            </form-field>

            <form-field icon="mdi-ladder" title="Стадия">
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
                prepend-icon=""
                prepend-inner-icon="mdi-paperclip"
                accept="image/png, image/jpeg, image/bmp"
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
          <v-col class="form-grid">
            <form-field
              v-for="contact in filteredContacts"
              :key="contact.id"
              :title="contact.name"
              :icon="contact.icon"
            >
              <v-text-field
                v-model="project[contact.id]"
                filled
                dense
                placeholder="Введите ссылку"
              ></v-text-field>
            </form-field>
          </v-col>
        </v-row>
        <!-- <div class="about-section__heading">
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
        </div> -->
        <!-- <v-divider></v-divider> -->
        <!-- <v-row>
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
        </v-row> -->
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
    <v-dialog v-model="editProjectLogoDialog" max-width="600">
      <project-logo-editor
        :project-id="activeProject"
        @closeProjectEditor="editProjectLogoDialog = false"
        @updateProjectLogo="updateProjectLogo"
      />
    </v-dialog>
    <v-dialog v-model="editProjectDialog" fullscreen hide-overlay>
      <project-editor
        :project-id="activeProject"
        @closeProjectEditor="editProjectDialog = false"
      />
    </v-dialog>
    <ConfirmDialog ref="confirm" />
  </div>
</template>

<script>
import ActionCard from '@/atoms/ActionCard.vue'
import FormField from '@/atoms/Form-field.vue'
import ProjectEditor from '@/components/CabinetPage/ProjectEditor'
import ProjectLogoEditor from '@/components/CabinetPage/ProjectLogoEditor'
import ConfirmDialog from '@/components/dialogs/ConfirmDialog'
import TCard from '~/atoms/TCard.vue'
export default {
  name: 'Projects',
  components: {
    ActionCard,
    FormField,
    TCard,
    ProjectEditor,
    ProjectLogoEditor,
    ConfirmDialog,
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
      filteredContacts: [],
      activeProject: null,
      editProjectDialog: false,
      editProjectLogoDialog: false,
      searchCity: null,
      logo: null,
      project: {
        name: '',
        state: '',
        subject: '',
        description: '',
        city: null,
        roles: [],
        website: '',
        instagram: '',
        vk: '',
        twitter: '',
        facebook: '',
      },
      requiredProjectFields: [
        'name',
        'description',
        'state',
        'subject',
        'city',
      ],
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
    cities() {
      return this.$store.state.utils.cities
    },
    rules() {
      return this.$store.state.utils.rules
    },
  },
  mounted() {
    this.filteredContacts = this.$store.state.utils.contacts
      .filter(
        (contact) =>
          contact.id !== 'linkedin' &&
          contact.id !== 'telegram' &&
          contact.id !== 'github'
      )
      .slice()
  },
  methods: {
    async deleteProject(id) {
      if (
        await this.$refs.confirm.open(
          'Подтверждение',
          'Вы точно хотите удалить этот проект?'
        )
      ) {
        this.$api.projects.deleteProject(id).then((res) => {
          this.$emit('refresh')
          this.$store.commit('processes/SET_SUCCESS', 'Проект удален')
        })
      }
    },
    editProject(id) {
      this.activeProject = id
      this.editProjectDialog = true
    },
    editProjectLogo(id) {
      this.activeProject = id
      this.editProjectLogoDialog = true
    },
    // toBase64(file) {
    //   return new Promise((resolve, reject) => {
    //     const reader = new FileReader()
    //     reader.readAsDataURL(file)
    //     reader.onload = () => resolve(reader.result)
    //     reader.onerror = (error) => reject(error)
    //   })
    // },

    sendProject() {
      const roles = []
      // try {
      //   roles = await Promise.all(
      //     this.project.roles.map(async (role) => {
      //       delete role.id
      //       const formData = new FormData()
      //       formData.append('file', role.photo)

      //       const { data } = await this.$api.projects.uploadRolePhoto(formData)
      //       console.log('sd', data)
      //       const resp = {
      //         ...role,
      //         photo: data.file.split(
      //           'https://findfoundbucket.s3.amazonaws.com/media/'
      //         )[1],
      //       }

      //       return resp
      //     })
      //   )
      // } catch (err) {
      //   console.log(err)
      //   roles = []
      // }
      const data = { ...this.project, roles, city: this.project.city.id }

      this.$api.projects
        .createProject(data, this.project.id)
        .then((res) => {
          if (this.logo !== null) {
            this.updateProjectLogo(res.data.id, this.logo, false)
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
    updateProjectLogo(id, logo, isEditing) {
      const formData = new FormData()
      formData.append('file', logo)
      this.$api.projects.uploadLogo(id, formData).then(() => {
        this.step = 1
        this.$emit('refresh')
        if (this.editProjectLogoDialog) this.editProjectLogoDialog = false
        this.$store.commit(
          'processes/SET_SUCCESS',
          isEditing ? 'Логотип обновлен' : 'Проект добавлен'
        )
      })
    },
    // manageParticipants(type, id) {
    //   type === 'add'
    //     ? this.project.roles.push({ ...this.participant, id: Math.random() })
    //     : (this.project.roles = this.project.roles.filter(
    //         (role) => role.id !== id
    //       ))
    // },
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
