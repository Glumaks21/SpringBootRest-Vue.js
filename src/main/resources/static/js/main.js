const {createApp} = Vue;
import messageList from "./messageList.js";
import messageRow from "./messageRow.js";

const app = createApp({
    data() {
        return {
            messages: []
        }
    },
    template: `
        <h2>My app list</h2>
        <message-list :messages="messages"/>
    `,
    async created() {
        axios.get("/messages")
            .then(response => response.data)
            .then(data => data.forEach(message =>
                this.messages.push(message)))
            .catch(err => console.log(err));
    }
});

app.component('message-list', messageList);
app.component('message-row', messageRow);
app.mount('#app');

