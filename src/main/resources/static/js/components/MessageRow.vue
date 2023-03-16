<template>
  <v-card variant="outlined">
    <v-card-title>
      <i>({{ message.id }})</i>{{ message.text }}
    </v-card-title>
    <v-card-actions>
      <v-btn variant="outlined" @click="$emit('edit', message)">edit</v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="$emit('delete', message)">
        <v-icon icon="mdi-delete"></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
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
