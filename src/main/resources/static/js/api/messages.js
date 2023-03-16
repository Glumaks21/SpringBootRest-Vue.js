import axios from "axios";

export default {
    add: message => axios.post('/messages', message),
    update: message => axios.put('/messages/' + message.id , message),
    remove: id => axios.delete('/messages/' + id)
}