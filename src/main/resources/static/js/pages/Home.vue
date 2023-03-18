<template>
  <v-container v-if="profile">
    <message-form @save="this.selectedMessage = null" :edit-message="selectedMessage"/>
    <message-list @edit="selectEditMessage"/>
  </v-container>
</template>

<script>
import MessageForm from "../components/MessageForm.vue";
import MessageList from "../components/MessageList.vue";
import {mapState} from "vuex";

export default {
  name: "HomePage",
  components: {MessageList, MessageForm},
  data() {
    return {
      selectedMessage: null,
    }
  },
  computed: {
    ...mapState({
      profile: state => state.profile
    }),
  },
  methods: {
    selectEditMessage(message) {
      this.selectedMessage = message;
    }
  }
}
</script>

<style scoped>

</style>