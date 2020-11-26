<template>
  <div style="width: 100%">
    <v-window v-model="step" class="student-window">
      <v-window-item :value="1">
        <v-col cols="12" class="col-sm-9">
          <div @click="step = 2">
            <ActionCard
              title="Добавить проект"
              :desc="
                projects === []
                  ? 'Чтобы найти людей в команду'
                  : 'Потому что много не бывает'
              "
            /></div
        ></v-col>
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
            <form-field
              icon="mdi-badge-account-horizontal-outline"
              title="Название"
            >
              <v-text-field
                v-model="project.name"
                :filled="disabled.project"
                dense
              ></v-text-field>
            </form-field>

            <form-field
              icon="mdi-badge-account-horizontal-outline"
              title="Стадия"
            >
              <v-select
                v-model="project.state"
                :items="states"
                dense
                :filled="disabled.project"
              ></v-select>
            </form-field>

            <form-field
              icon="mdi-badge-account-horizontal-outline"
              title="Тема"
            >
              <v-text-field
                v-model="project.subject"
                :filled="disabled.project"
                dense
              ></v-text-field>
            </form-field>
          </v-col>
          <v-col cols="12" class="col-md-6">
            <form-field
              icon="mdi-badge-account-horizontal-outline"
              title="Логотип"
            >
              <v-file-input
                v-model="image"
                accept="image/png, image/jpeg, image/bmp"
                prepend-icon=""
                dense
                :filled="disabled.project"
                placeholder="Выберите файл"
                @change="toBase64"
              >
                <template v-slot:selection="{ text }">
                  <v-chip small label color="primary">
                    {{ text }}
                  </v-chip>
                </template>
              </v-file-input>
            </form-field>
            <form-field
              icon="mdi-badge-account-horizontal-outline"
              title="Описание"
            >
              <v-textarea
                v-model="project.description"
                :filled="disabled.project"
                dense
              ></v-textarea>
            </form-field>
          </v-col>
        </v-row>
        <div class="about-section__heading">
          <h3>Команда</h3>
        </div>
        <v-divider></v-divider>
        <v-row>
          <div v-for="(p, id) in project.roles" :key="id">
            <div class="participant-card d-col mt-6 mx-2 team-card">
              <v-icon class="mb-4" size="56">mdi-face-profile</v-icon>

              <form-field
                title="Фамилия и имя"
                icon="mdi-badge-account-horizontal"
              >
                <v-text-field v-model="p.full_name" dense></v-text-field>
              </form-field>
              <form-field title="Должность" icon="mdi-cog">
                <v-text-field v-model="p.roles"> </v-text-field>
              </form-field>
              <form-field title="Об участнике" icon="mdi-text-account">
                <v-textarea v-model="p.description" dense></v-textarea>
              </form-field>
            </div>
          </div>

          <div
            class="pa-6 mt-6 mx-2 d-col align-center new-participant"
            @click="manageParticipants('add')"
          >
            <v-btn elevation="0" color="primary" fab
              ><v-icon>mdi-plus</v-icon></v-btn
            >
            <h4 class="participant-card__title mt-4">Добавить участника</h4>
          </div>
        </v-row>
        <br />
        <v-btn large class="my-6" outlined @click="sendProject">Создать</v-btn>
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
import ActionCard from '@/atoms/ActionCard.vue'
import FormField from '@/atoms/Form-field.vue'
export default {
  name: 'Projects',
  components: {
    ActionCard,
    FormField,
  },
  props: {
    projects: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      step: 2,
      image: null,
      states: ['Идея', 'Готовится MVP', 'MVP готов', 'Pre-seed'],
      disabled: {
        project: true,
      },
      project: {
        name: 'Random Coffee',
        state: 'Готов MVP',
        subject: 'Нетворкинг',
        description:
          'Random Coffee снимает неловкость первого шага в общении, организует неформальные встречи',
        logo: null,
        city: 2,
        roles: [],
      },
      participant: {
        full_name: 'Иванов Иван',
        position: 'CTO',
        description:
          'Ответственный и дружелюбный. Всегда придет на помощь в трудную минуту',
        photo: null,
      },
    }
  },
  mounted() {
    this.manageParticipants('add')
  },

  methods: {
    toBase64(file) {
      this.project.logo = new FileReader().readAsDataURL(file)
    },
    sendProject() {
      const participants = this.project.roles.map((role) => {
        delete role.id
        return role
      })
      const data = { ...this.project, participants }

      this.$api.projects.createProject(data).then((res) => {
        console.log(res)
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
  border-radius: 12px;
  height: fit-content;
  border: 1px solid #dddddd !important;
  color: #757575;
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
  text-align: center;
}

.participant-card__description {
  text-align: left;
}
.participant-card__chip {
  width: fit-content;
}
</style>
