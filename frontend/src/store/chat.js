import Vue from 'vue';

export default {
    state: {
        messages: [],
        online_users: null,
        users_count: null
      },
      mutations: {
        SOCKET_JOINCHAT(state, online_users) {
          Vue.set(state, 'online_users', online_users);
        },

        SOCKET_MESSAGECHAT(state, message) {
          state.messages.push(message);
        },

        SOCKET_UPDATEROOMUSERS(state, users) {
          state.online_users = users;
        }
      },

      actions: {
        socket_joinChat({commit, state}, online_users) {
            commit('SOCKET_JOINCHAT', online_users);
            state.users_count = Object.keys(online_users).length;
        },

        socket_updateRoomUsers({commit, state}, users) {
          commit('SOCKET_UPDATEROOMUSERS', users);
          state.users_count = Object.keys(users).length;
      }
      },
     getters: {
         messages: state => {
             return state.messages;
         },

         onlineUsers: state => {
          return state.online_users;
         },

         onlineUsersCount: state => {
           return state.users_count;
         }
     }
}