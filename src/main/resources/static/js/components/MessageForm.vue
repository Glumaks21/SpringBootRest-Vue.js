<template>
  <v-form @submit.prevent>
    <v-container>
      <v-row>
        <v-col sm="10">
          <v-text-field v-model="message.text" placeholder="Write something..." label="New message"/>
        </v-col>
        <v-col sm="2">
          <v-btn size="large" @click="saveOrUpdate">Send</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapActions} from "vuex"

export default {
  name: "message-form",
  props: {
    editMessage: {
      type: [null, Object],
      required: false
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
  methods: {
    ...mapActions({
      save: 'message/saveMessage',
      update: 'message/updateMessage'
    }),
    saveOrUpdate() {
      if (this.editMessage !== null) {
        this.update(this.message)
      } else {
        this.save(this.message)
      }

      this.$emit("save")
    }
  },
  watch: {
    editMessage(newEditMessage) {
      if (newEditMessage !== null) {
        this.message.id = newEditMessage.id
        this.message.text = newEditMessage.text
      } else {
        this.message.id = null
        this.message.text = ''
      }
    }
  }
}
</script>

<style scoped>

</style>