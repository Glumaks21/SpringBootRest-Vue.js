<template>
  <v-card variant="outlined">
    <v-card-title>
      <i>{{ message.id }}</i>{{ message.text }}
    </v-card-title>
    <v-card-text> <!-- Описание заведения -->
      <p class="text-body-1">{{ message.text }}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn variant="outlined" @click="$emit('edit', this.message)">edit</v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="removeMessage(this.message)">
        <v-icon icon="mdi-delete"></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>


<script>
import {mapActions } from "vuex";

export default {
  name: 'message-row',
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions({
      removeMessage: 'message/removeMessage'
    })
  }
}
</script>

<style scoped>

</style>
