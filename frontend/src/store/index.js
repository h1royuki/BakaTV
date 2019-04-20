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
    isAuthorize: null,
    loading: false
  },

  mutations: {
    changeLoading(state) {
      state.isLoading = !state.isLoading;
    },

    stopLoading(state) {
      state.isLoading = false;
    },

    auth(state, bool) {
     state.isAuthorize = bool;
    }
  },

  actions: {

    socket_auth({commit}, bool) {
      commit('auth', bool);
    },

    socket_updateToken({}, data) {
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('userToken', data.userToken)
    },

    socket_createRoom({ state }, id) {
      router.push('room/' + id);
      state.loading = false;
    },

    socket_destroyRoom({commit}) {
      commit('resetChat');
      commit('resetPlayer');
      commit('resetPlaylist');
      commit('resetRoom');
      
      router.push("/");
  },
  },

  getters: {
    isLoading: state => {
      return state.loading;
    },

    isAuthorize: state => {
      return state.isAuthorize;
    }
  }
})