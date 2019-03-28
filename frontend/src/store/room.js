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