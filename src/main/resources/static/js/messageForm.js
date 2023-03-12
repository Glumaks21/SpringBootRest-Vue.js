export default {
    props: {
        selectedMessage: {
            type: [null, Object],
            required: true
        }
    },
    data() {
        return {
            message: {
                id: null,
                text: ''
            }
        }
    },
    template: `
        <div>
            <form @submit.prevent>
                <input type="text" v-model="message.text" placeholder="Write something..."/>
                <input type="submit" @click="save" value="Save"/>
            </form>
        </div>
    `,
    watch: {
        selectedMessage(selectedMessage) {
            if (selectedMessage !== null) {
                this.message = selectedMessage;
            }
        }
    },
    methods: {
        save() {
            this.$emit('save', this.message);
            this.message.id = null;
            this.message.text = '';
        }
    }
}