import { createRouter, createWebHistory } from "vue-router"
import Home from "../pages/Home.vue";
import Profile from "../pages/Profile.vue"

const routes = [
    { path: '/', component: Home },
    { path: '/profile', component: Profile },
    { path: '/.*', component: Home }
];

export default createRouter({
    routes,
    history: createWebHistory()
})