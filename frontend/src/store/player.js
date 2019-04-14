import Vue from 'vue';

export default {
    state: {
        lastTime: null,
        lastStatus: null
    },
    mutations: {
        updateFilm(state, film) {
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
        socket_updateFilm({ commit }, film) {
            commit('updateFilm', film);
        },

        setFilmTime({commit}, time) {
            commit('setLastTime', time);
        },

        setFilmStatus({commit}, status) {
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