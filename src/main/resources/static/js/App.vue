<template>
  <div class="container">
    <h2>Sarafan</h2>
    <div v-if="profile">
      <a href="/logout">Log out</a>
      <message-form :selectedMessage="selectedMessage" @save="saveMessage"/>
      <message-list :messages="messages" @edit="editMessage" @delete="deleteMessage"/>
    </div>
    <div v-else>Need authorize via <a href="/oauth2/authorization/google">Google</a></div>
  </div>
</template>

<script>
import MessageForm from "./components/MessageForm.vue";
import MessageList from "./components/MessageList.vue";
import axios from "axios";
import {addHandler} from "./util/ws";

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
      };
    },
    async deleteMessage(message) {
      const isDeleted = await axios.delete('/messages/' + message.id)
          .then(response => response.status === 200)
          .catch(err => console.log(err));

      if (isDeleted) {
        this.messages.splice(this.messages.indexOf(message), 1);
      }
    }
  },
  created() {
    addHandler(message => {
      let index = -1
      if (message.id !== null) {
        for (let i = 0; i < this.messages.length; i++) {
          if (this.messages[i].id === message.id) {
            index = i;
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
