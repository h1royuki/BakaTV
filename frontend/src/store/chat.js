import Vue from 'vue';

export default {
    state: {
        messages: [],
        online_users: null,
        users_count: null
      },
      mutations: {
        joinChat(state, online_users) {
          Vue.set(state, 'online_users', online_users);
        },

        SOCKET_MESSAGECHAT(state, message) {
          state.messages.push(message);
        },

        updateRoomUsers(state, users) {
          state.online_users = users;
        },

        resetChat(state) {
          state.messages = [];
          state.online_users = null;
          state.users_count = null;
        }
      },

      actions: {
        socket_joinChat({commit, state}, online_users) {
            commit('joinChat', online_users);
            state.users_count = Object.keys(online_users).length;
        },

        socket_updateRoomUsers({commit, state}, users) {
          commit('updateRoomUsers', users);
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