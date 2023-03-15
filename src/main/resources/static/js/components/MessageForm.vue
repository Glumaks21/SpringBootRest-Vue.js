<template>
  <div>
    <form @submit.prevent>
      <input type="text" v-model="message.text" placeholder="Write something..."/>
      <input type="submit" @click="save" value="Save"/>
    </form>
  </div>
</template>

<script>
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
      this.$emit('save', this.message);
      this.message.id = null;
      this.message.text = '';
    }
  }
}
</script>

<style scoped>

</style>