import Vue from 'vue';

export default {
    state: {
        messages: [],
        id: null,
        online_users: null,
        users_count: null
      },
      mutations: {
        SOCKET_JOINCHAT(state, data) {
          Vue.set(state, 'id', data.id);
          Vue.set(state, 'online_users', data.online_users);
        },

        SOCKET_MESSAGECHAT(state, message) {
          state.messages.push(message);
        },

        SOCKET_UPDATECHATUSERS(state, users) {
          state.online_users = users;
        }
      },

      actions: {
        socket_joinChat({commit, state}, data) {
            commit('SOCKET_JOINCHAT', data);
            state.users_count = Object.keys(data.online_users).length;
        },

        socket_updateChatUsers({commit, state}, users) {
          commit('SOCKET_UPDATECHATUSERS', users);
          state.users_count = Object.keys(users).length;
      }
      },
     getters: {
         messages: state => {
             return state.messages;
         },
         id: state => {
             return state.id;
         },

         onlineUsers: state => {
          return state.online_users;
         },

         onlineUsersCount: state => {
           return state.users_count;
         }
     }
}