<template>
  <v-app>
    <page-header/>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import '@mdi/font/css/materialdesignicons.css'
import {addHandler} from "./util/ws"
import { mapState, mapActions} from "vuex";
import PageHeader from "./components/Header.vue";

export default {
  components: {PageHeader},
  methods: {
    ...mapActions({
      init: 'message/fetchMessages',
      saveMessageToList: 'message/saveToList',
      removeMessageFromList: 'message/removeFromList',
    })
  },
  computed: {
    ...mapState({
      profile: state => state.profile
    })
  },
  created() {
    this.init()

    addHandler(({objectType, eventType, body}) => {
      if (objectType === 'MESSAGE') {
        const message = body

        switch (eventType) {
          case "CREATE":
          case "UPDATE":
            this.saveMessageToList(message)
            break
          case "REMOVE":
            this.removeMessageFromList(message)
            break
          default:
            console.log(`Looks like the event type is unknown ${eventType}`)
        }
      } else {
        console.log(`Looks like the object type is unknown ${objectType}`)
      }
    })
  },
  beforeMount() {
    if (!this.profile) {
      this.$router.replace('/auth')
    }
  }
}
</script>

<style scoped>

</style>
