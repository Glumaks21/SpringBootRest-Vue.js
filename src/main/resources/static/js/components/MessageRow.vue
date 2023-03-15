<template>
  <div class="row">
      <i>({{ message.id }})</i>{{ message.text }}
      <button @click="$emit('edit', message)">edit</button>
      <button @click="$emit('delete', message)">delete</button>
  </div>
</template>

<script>
export default {
  name: 'message-row',
  props: {
    message: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
