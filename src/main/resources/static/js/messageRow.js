export default {
    name: 'message-row',
    props: {
        message: {
            type: Object,
            required: true
        }
    },
    template: `
        <div>
            <i>({{ message.id }})</i>{{ message.text }}
            <button @click="$emit('edit', message)">edit</button>
            <button @click="$emit('delete', message)">delete</button>
        </div>
    `
}