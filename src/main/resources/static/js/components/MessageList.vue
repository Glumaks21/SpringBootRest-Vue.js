<template>
  <div class="container">
    <message-row v-for="message in messages" :key="message.id" :message="message"
                 @edit="$emit('edit', message)"
                 @delete="$emit('delete', message)"/>
  </div>
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
  }
}
</script>

<style scoped>

</style>