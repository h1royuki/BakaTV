import Vue from 'vue';

export default {
    state: {
        userId: null,
        roomId: null,
        ownerId: null,
        isOwner: false,
    },
    mutations: {
        SOCKET_JOINROOM(state, data) {
            Vue.set(state, 'userId', data.userId);
            Vue.set(state, 'ownerId', data.room.owner);
            Vue.set(state, 'roomId', data.room.id);
        },

        SOCKET_UPDATEROOMOWNER(state, owner) {
            Vue.set(state, 'ownerId', owner);
        }
    },

    actions: {
        socket_joinRoom({state, commit}, data) {
            commit('SOCKET_JOINROOM', data);

            if(data.userId == data.room.owner) {
                state.isOwner = true;
            } else {
                state.isOwner = false;
            }
        },

        socket_updateRoomOwner({state, commit}, owner) {
            commit('SOCKET_UPDATEROOMOWNER', owner);

            if(state.userId == owner) {
                state.isOwner = true;
            } else {
                state.isOwner = false;
            }

        }
    },
    
    getters: {
        room: state => {
            return state;
        },
        isOwner: state => {
            return state.isOwner;
        },

        userId: state => {
            return state.userId;
        },

        roomId: state => {
            return state.roomId;
        }
    }
}