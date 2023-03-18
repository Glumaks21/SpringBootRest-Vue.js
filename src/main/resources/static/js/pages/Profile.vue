<template>
  <v-container>
    <v-row class="justify-center">
      <v-col>User profile</v-col>
    </v-row>
    <v-row>
      <v-col class="align-center sm-3">
        <div class="d-flex">
          <v-img :src="profile.picture" max-width="200px"/>
          <v-card>
            <v-card-text>
              <div class="d-flex flex-column">
                <div>{{ profile.email }}</div>
                <div>{{ profile.fullName }}</div>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Profile",
  computed: {
    ...mapState({
      profile: state => state.profile
    })
  }
}
</script>

<style scoped>

</style>