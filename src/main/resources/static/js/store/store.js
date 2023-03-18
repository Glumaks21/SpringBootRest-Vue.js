import { createStore } from 'vuex'
import messageModule from "./modules/messageModule";

export default createStore({
    state() {
        return {
            profile: profile
        }
    },
    modules: {
        message: messageModule,
    }
})