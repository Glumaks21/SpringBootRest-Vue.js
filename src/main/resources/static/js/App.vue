<template>
  <v-app>
    <v-layout>
      <v-app-bar :elevation="2">
        <v-app-bar-title>Sarafan</v-app-bar-title>

        <div v-if="profile">
          <v-label>{{ profile.email }}</v-label>
          <v-app-bar-nav-icon href="/logout" icon="mdi-exit-to-app"></v-app-bar-nav-icon>
        </div>
        <div v-else>
          <v-app-bar-nav-icon class="mr-10" href="/oauth2/authorization/google" icon="mdi-dots-vertical">
            Login
          </v-app-bar-nav-icon>
        </div>
      </v-app-bar>

      <v-main v-if="profile">
        <v-container>
          <message-form :selectedMessage="selectedMessage" @save="saveMessage"/>
          <message-list :messages="messages" @edit="editMessage" @delete="deleteMessage"/>
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script>
import '@mdi/font/css/materialdesignicons.css'
import MessageForm from "./components/MessageForm.vue"
import MessageList from "./components/MessageList.vue"
import axios from "axios"
import {addHandler} from "./util/ws"

export default {
  components: {MessageList, MessageForm},
  data() {
    return {
      selectedMessage: null,
      messages: frontendData.messages,
      profile: frontendData.profile
    }
  },
  methods: {
    fetchMessages() {
      axios.get("/messages")
          .then(response => this.messages = [...response.data])
          .catch(err => console.log(err))
    },
    async saveMessage(message) {

    },
    editMessage(message) {
      this.selectedMessage = {
        id: message.id,
        text: message.text
      }
    },
    async deleteMessage(message) {
      const isDeleted = await axios.delete('/messages/' + message.id)
          .then(response => response.status === 200)
          .catch(err => console.log(err))

      if (isDeleted) {
        this.messages.splice(this.messages.indexOf(message), 1)
      }
    }
  },
  created() {
    addHandler(message => {
      let index = -1
      if (message.id !== null) {
        for (let i = 0; i < this.messages.length; i++) {
          if (this.messages[i].id === message.id) {
            index = i
            break
          }
        }
      }

      if (index !== -1) {
        this.messages.splice(index, 1, message)
      } else {
        this.messages.push(message)
      }
    })
  }
}
</script>

<style scoped>

</style>
