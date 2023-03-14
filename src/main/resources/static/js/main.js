import messageForm from "./messageForm.js";
import messageList from "./messageList.js";
import messageRow from "./messageRow.js";

const {createApp} = Vue;

const app = createApp({
    data() {
        return {
            selectedMessage: null,
            messages: frontendData.messages,
            profile: frontendData.profile
        }
    },
    template: `
        <h2>My app list</h2>
        <div v-if="!profile">Need authorize via <a href="/oauth2/authorization/google">GitHub</a></div>
        <div v-else>
            <a href="/logout">Log out</a>
            <message-form :selectedMessage="selectedMessage" @save="saveMessage"/>
            <message-list :messages="messages" @edit="editMessage" @delete="deleteMessage"/>
        </div>    
`,
    created() {
        //this.fetchMessages();
    },
    methods: {
        fetchMessages() {
            axios.get("/messages")
                .then(response => this.messages = [...response.data])
                .catch(err => console.log(err));
        },
        async saveMessage(message) {
            if (message.id !== null) {
                const saved = await axios.put('/messages/' + message.id, message)
                    .then(response => response.data)
                    .catch(err => console.log(err));

                for (let i = 0; i < this.messages.length; i++) {
                    if (this.messages[i].id === saved.id) {
                        this.messages[i] = saved;
                        break
                    }
                }

                this.selectedMessage = null;
            } else {
                axios.post('/messages', message)
                    .then(response => this.messages = [...this.messages, response.data])
                    .catch(err => console.log(err));
            }
        },
        editMessage(message) {
            this.selectedMessage = {
                id: message.id,
                text: message.text
            };
        },
        async deleteMessage(message) {
            const isDeleted = await axios.delete('/messages/' + message.id)
                .then(response => response.status === 200)
                .catch(err => console.log(err));

            if (isDeleted) {
                this.messages.splice(this.messages.indexOf(message), 1);
            }
        }
    }
});

app.component('message-form', messageForm);
app.component('message-list', messageList);
app.component('message-row', messageRow);
app.mount('#app');

