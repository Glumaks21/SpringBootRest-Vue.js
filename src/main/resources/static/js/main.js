import {createApp} from 'vue'

import App from "./App.vue"
import {connect} from "./util/ws";
import vuetify from "./plugins/vuetify";

if (frontendData.profile) {
    connect()
}

createApp(App)
    .use(vuetify)
    .mount('#app')

