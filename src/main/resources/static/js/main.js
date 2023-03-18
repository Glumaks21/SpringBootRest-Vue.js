import {createApp} from 'vue'
import App from "./App.vue"

import '@babel/polyfill'
import { connect } from "./util/ws"
import vuetify from "./vuetify/vuetify"
import vuex from "./store/store"
import router from "./router/router";

if (profile) {
    connect()
}

createApp(App)
    .use(vuetify)
    .use(vuex)
    .use(router)
    .mount('#app')

