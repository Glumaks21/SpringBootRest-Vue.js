<template>
  <v-form @submit.prevent>
    <v-container>
      <v-row>
        <v-col sm="10">
          <v-text-field v-model="message.text" placeholder="Write something..." label="New message"/>
        </v-col>
        <v-col sm="2">
          <v-btn size="large" @click="save">Send</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>

import messagesApi from "../api/messages";

export default {
  name: "message-form",
  props: {
    selectedMessage: {
      type: [null, Object],
      required: false,
      default: null
    }
  },
  data() {
    return {
      message: {
        id: null,
        text: ''
      }
    }
  },
  watch: {
    selectedMessage(selectedMessage) {
      if (selectedMessage !== null) {
        this.message = selectedMessage;
      }
    }
  },
  methods: {
    save() {
      if (this.message.id === null) {
        messagesApi.add(this.message)
            .then(saved => this.$emit('add', saved.data))
            .catch(err => console.log(err))
      } else {
        messagesApi.update(this.message)
            .then(updated => this.$emit('update', updated.data))
            .catch(err => console.log(err))
      }

      this.message.id = null;
      this.message.text = '';
    }
  }
}
</script>

<style scoped>

</style>