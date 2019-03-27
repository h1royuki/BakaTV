import Vue from 'vue';

export default {
    state: {
        filmName: null,
        isOwner: false
    },
    mutations: {
        SOCKET_JOINROOM(state, room) {
            Vue.set(state, 'filmName', room.filmName);
            Vue.set(state, 'isOwner', room.isOwner);
        },

        SOCKET_SETOWNER(state) {
            Vue.set(state, 'isOwner', true);
        },

        SOCKET_CONTROLSTREAM(state, status) {
            Vue.set(state, 'status', status);
        }
    },

    actions: {
        socket_joinRoom({ commit }, room) {
            commit('SOCKET_JOINROOM', room);
            document.title = `[${room.status}] ${room.filmName}`;
        },

        socket_controlStream({ state, commit }, status) {
            commit('SOCKET_CONTROLSTREAM', status);
            document.title = `[${status}] ${state.filmName}`;
        }
    },

    getters: {
        room: state => {
            return state;
        },
        status: state => {
            return state.status;
        },
        isOwner: state => {
            return state.isOwner;
        }
    }
}