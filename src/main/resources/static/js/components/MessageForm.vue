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
import {sendMessage} from "../util/ws";

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
      sendMessage(this.message)
      this.$emit('save', this.message);
      this.message.id = null;
      this.message.text = '';
    }
  }
}
</script>

<style scoped>

</style>