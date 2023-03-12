export default {
    name: 'message-list',
    props: {
        messages: {
            type: Array,
            required: true
        }
    },
    template: `
        <div>
            <message-row v-for="message in messages" :message="message" 
            @edit="$emit('edit', message)" @delete="$emit('delete', message)" :key="message.id"/>
        </div>
    `,
}