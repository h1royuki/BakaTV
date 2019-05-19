import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';
import chat from './chat';
import room from './room';
import player from './player';
import playlist from './playlist';
import search from './search';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    chat,
    room,
    player,
    playlist,
    search
  },

  state: {
    isAuthorize: null,
    loading: false,
    userId: null,
    userName: null,
    userRooms: []
  },

  mutations: {
    startLoading(state) {
      state.loading = true;
    },

    stopLoading(state) {
      state.loading = false;
    },

    auth(state, data) {
      state.isAuthorize = true;
      state.userId = data.userId;
      state.userName = data.userName;
    },
    setUserRooms(state, rooms) {
      state.userRooms = rooms;
    }
  },

  actions: {
    socket_auth({ commit }, data) {
      commit('auth', data);
    },

    socket_wipeStorage() {
      localStorage.removeItem('userId');
      localStorage.removeItem('userToken');
      location.reload();
    },

    socket_updateToken({}, data) {
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('userToken', data.userToken);
    },

    socket_createRoom({ state }, id) {
      router.push('room/' + id);
      state.loading = false;
    },

    socket_updateUserRooms({ commit }, rooms) {
      commit('setUserRooms', rooms);
    },

    socket_destroyRoom({ commit }) {
      commit('resetChat');
      commit('resetPlayer');
      commit('resetPlaylist');
      commit('resetRoom');
      commit('resetSearch');

      router.push("/");
    }
  },

  getters: {
    isLoading: state => {
      return state.loading;
    },

    isAuthorize: state => {
      return state.isAuthorize;
    },

    userId: state => {
      return state.userId;
    },

    userName: state => {
      return state.userName;
    },

    userRooms: state => {
      return state.userRooms;
    }
  }
})