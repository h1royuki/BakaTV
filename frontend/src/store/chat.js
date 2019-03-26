import Vue from 'vue';

export default {
    state: {
        messages: [],
        id: null,
      },
      mutations: {
        SOCKET_CHATJOIN(state, id) {
          Vue.set(state, 'id', id);
        },

        SOCKET_CHATMESSAGE(state, message) {
          state.messages.push(message);
        },
      },
     getters: {
         messages: state => {
             return state.messages;
         },
         id: state => {
             return state.id;
         }
     }
}