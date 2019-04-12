import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';
import chat from './chat';
import room from './room';
import player from './player';
import playlist from './playlist';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    chat,
    room,
    player,
    playlist
  },

  state: {
    loading: false
  },

  mutations: {
    changeLoading(state) {
      Vue.set(state, 'loading', !state.loading);
    }
  },

  actions: {
    socket_createRoom({ state }, id) {
      router.push('room/' + id);
      state.loading = false;
    },

    socket_destroyRoom({state}) {
      Vue.set(state.room, 'filmName', null);
      Vue.set(state.room, 'status', null);
      Vue.set(state.room, 'isOwner', false);
      Vue.set(state.chat, 'messages', []);
      
      router.push("/");
  },
  },

  getters: {
    isLoading: state => {
      return state.loading;
    }
  }
})