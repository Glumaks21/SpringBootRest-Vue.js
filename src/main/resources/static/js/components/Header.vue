<template>
  <v-app-bar app :elevation="2">
    <v-app-bar-title>Sarafan</v-app-bar-title>

    <v-btn flat
           v-if="profile"
           :disabled="$route.path === '/'"
           @click="$router.push('/')">
      Messages
    </v-btn>
    <v-btn flat
           v-if="profile"
           :disabled="$route.path === '/profile'"
           @click="$router.push('/profile')">
      {{ profile.fullName }}
    </v-btn>
    <v-app-bar-nav-icon v-if="profile" href="/logout" icon="mdi-exit-to-app"></v-app-bar-nav-icon>

    <v-app-bar-nav-icon v-if="!profile" class="mr-10" href="/oauth2/authorization/google" icon="mdi-dots-vertical">
      Login
    </v-app-bar-nav-icon>
  </v-app-bar>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "PageHeader",
  computed: {
    ...mapState({
      profile: state => state.profile
    })
  }
}
</script>

<style scoped>

</style>