export default {
    name: 'message-row',
    props: {
        message: {
            type: Object,
            required: true
        }
    },
    template: `
        <div><i>({{ message.id }})</i>{{ message.text }}</div>
    `
}