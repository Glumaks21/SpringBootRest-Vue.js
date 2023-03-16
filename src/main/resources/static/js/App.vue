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
          <message-form :selectedMessage="selectedMessage" @save="saveMessage" @update="saveMessage"/>
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
import messagesApi from "./api/messages";

export default {
  methods: {
    fetchMessages() {
      axios.get("/messages")
          .then(response => this.messages = [...response.data])
          .catch(err => console.log(err))
    },
    saveMessage(saved) {
      console.log(saved)
      let index = this.messages
          .indexOf(message => message.id === saved.id)
      if (index > -1) {
        this.messages.splice(index, 1, saved)
      } else {
        this.messages.push(saved)
      }
    },
    editMessage(message) {
      this.selectedMessage = {
        id: message.id,
        text: message.text
      }
    },
    async deleteMessage(message) {
      messagesApi.remove(message.id)
          .then(response => {
            if (response.status === 200) {
              this.messages.splice(this.messages.indexOf(message), 1)
            }
          })
          .catch(err => console.log(err))
    }
  },
  components: {MessageList, MessageForm},
  data() {
    return {
      selectedMessage: null,
      messages: frontendData.messages,
      profile: frontendData.profile
    }
  },
  created() {
    addHandler(data => {
      if (data.objectType === 'MESSAGE') {
        const index = this.messages.findIndex(message => message.id === data.body.id)

        switch (data.eventType) {
          case "CREATE":
          case "UPDATE":
            if (index > -1) {
              this.messages.splice(index, 1, data.body)
            } else {
              this.messages.push(data.body)
            }
            break
          case "REMOVE":
              this.messages.splice(index, 1)
            break
          default:
            console.log(`Looks like the event type is unknown ${data.eventType}`)
        }
      } else {
        console.log(`Looks like the object type is unknown ${data.objectType}`)
      }
    })
  }
}
</script>

<style scoped>

</style>
