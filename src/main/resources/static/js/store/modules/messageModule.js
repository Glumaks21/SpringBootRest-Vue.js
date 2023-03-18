import messagesApi from "../../api/messages";

export default {
    state() {
        return {
            messages: []
        }
    },
    getters: {
        sortedMessages(state) {
            return state.messages.sort((a, b) => -(a.id - b.id))
        }
    },
    mutations: {
        setMessages(state, messages) {
            state.messages = messages;
        },
    },
    actions: {
        async fetchMessages({commit, state}) {
            messagesApi.getAll()
                .then(response => {
                    commit('setMessages', response.data)
                })
                .catch(err => console.error(err))
        },
        saveToList({commit, state}, message) {
            const index = state.messages.findIndex(item => item.id === message.id)

            if (index > -1) {
                commit('setMessages', [
                    ...state.messages.slice(0, index),
                    message,
                    ...state.messages.slice(index + 1)
                ])
            } else {
                commit('setMessages', [...state.messages, message])
            }
        },
        removeFromList({commit, state}, message) {
            const index = state.messages.findIndex(item => item.id === message.id)

            if (index > -1) {
                commit('setMessages', [
                    ...state.messages.slice(0, index),
                    ...state.messages.slice(index + 1)
                ])
            }
        },
        async saveMessage({dispatch}, message) {
            messagesApi.add(message)
                .then(response => {
                    dispatch('saveToList', response.data)
                })
                .catch(err => console.error(err))
        },
        async updateMessage({dispatch}, message) {
            messagesApi.update(message)
                .then(response => {
                    dispatch('saveToList', response.data)
                })
                .catch(err => console.error(err))
        },
        async removeMessage({dispatch}, message) {
            messagesApi.remove(message.id)
                .then(response => {
                    dispatch('removeFromList', response.data)
                })
        },
    },
    namespaced: true
}