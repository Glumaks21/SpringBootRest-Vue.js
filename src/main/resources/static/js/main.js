import {createApp} from 'vue'
import App from "./App.vue"
import { connect } from "./util/ws";

connect()

const app = createApp(App)

app.mount("#app");

