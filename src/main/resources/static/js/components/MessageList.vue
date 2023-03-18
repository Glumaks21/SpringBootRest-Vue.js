<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-center text-h3 py-3">List of messages</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="4" v-for="message in sortedMessages" :key="message.id">
        <message-row :message="message" @edit="$emit('edit', message)"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import MessageRow from "./MessageRow.vue";

export default {
  components: {MessageRow},
  name: 'message-list',
  computed: {
    ...mapGetters({
      sortedMessages: 'message/sortedMessages'
    })
  }
}
</script>

<style scoped>

</style>