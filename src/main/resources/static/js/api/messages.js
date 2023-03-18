import axios from "axios";

const url = '/messages'
export default {
    getAll: () => axios.get(url),
    get: id => axios.get(url + '/' + id),
    add: message => axios.post(url, message),
    update: message => axios.put(url + '/' + message.id , message),
    remove: id => axios.delete(url + '/' + id)
}