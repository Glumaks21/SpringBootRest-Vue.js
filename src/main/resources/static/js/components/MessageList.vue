<template>
  <v-list lines="two">
    <v-list-item v-for="message in sortedMessages" :key="message.id">
    <message-row :message="message"
                 @edit="$emit('edit', message)"
                 @delete="$emit('delete', message)"/>
    </v-list-item>
  </v-list>
</template>

<script>
import MessageRow from "./MessageRow.vue";

export default {
  components: {MessageRow},
  name: 'message-list',
  props: {
    messages: {
      type: Array,
      required: true
    }
  },
  computed: {
    sortedMessages() {
      return this.messages.sort((a, b) => -(a.id - b.id))
    }
  }
}
</script>

<style scoped>

</style>