import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';
import chat from './chat';
import room from './room';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    chat,
    room
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
    socket_roomCreated({ state }, id) {
      router.push('room/' + id);
      state.loading = false;
    },

    socket_roomDestroy({state}) {
      Vue.set(state.room.room, 'filmName', null);
      Vue.set(state.room.room, 'status', null);
      Vue.set(state.room.room, 'isOwner', false);
      Vue.set(state.room.player, 'sources', []);
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