import Vue from 'vue';

export default {
    state: {
        lastTime: null,
        lastStatus: null
    },
    mutations: {
        SOCKET_GETPLAYERSTATE(state, player) {
            Vue.set(state, 'lastTime', player.time);
            Vue.set(state, 'lastStatus', player.status);
        },

        setLastTime(state, time) {
            state.lastTime = time;
        },

        setLastStatus(state, status) {
            state.lastStatus = status;
        }
    },

    actions: {
        socket_GETPLAYERSTATE({ commit }, room) {
            document.title = room.name;
            commit('SOCKET_JOINROOM', room);
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