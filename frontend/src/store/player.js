import Vue from 'vue';

export default {
    state: {
        lastTime: null,
        lastStatus: null
    },
    mutations: {
        setFilmInfo(state, film) {
            Vue.set(state, 'lastTime', film.time);
            Vue.set(state, 'lastStatus', film.status);
        },

        setLastTime(state, time) {
            state.lastTime = time;
        },

        setLastStatus(state, status) {
            state.lastStatus = status;
        }
    },

    actions: {

        socket_setCurrentFilm({commit}, film) {
            document.title = film.name;
            commit('setFilmInfo', film);
        },

        socket_getFilmInfo({ commit }, film) {
            document.title = film.name;
            commit('setFilmInfo', film);
        },

        setLastTime({commit}, time) {
            commit('setLastTime', time);
        },

        setLastStatus({commit}, status) {
            commit('setLastStatus', status);
        }
    },
    getters: {
        lastTime : state => {
            return state.lastTime;
        },
        lastStatus : state => {
            return state.lastStatus;
        }
    }
}