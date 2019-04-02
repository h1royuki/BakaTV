import Vue from 'vue';

export default {
    state: {
        roomId: null,
        isOwner: false,
    },
    mutations: {
        SOCKET_JOINROOM(state, room) {
            Vue.set(state, 'isOwner', room.isOwner);
            Vue.set(state, 'roomId', room.id);
        },

        SOCKET_SETOWNER(state) {
            Vue.set(state, 'isOwner', true);
        }
    },
    
    getters: {
        room: state => {
            return state;
        },
        isOwner: state => {
            return state.isOwner;
        },
        roomId: state => {
            return state.roomId;
        }
    }
}