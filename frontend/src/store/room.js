import Vue from 'vue';

export default {
    state: {
        userId: null,
        roomId: null,
        ownerId: null,
        isOwner: false,
    },
    mutations: {
        joinRoom(state, data) {
            Vue.set(state, 'userId', data.userId);
            Vue.set(state, 'ownerId', data.room.ownerId);
            Vue.set(state, 'roomId', data.room.id);
        },

        updateRoomOwner(state, owner) {
            Vue.set(state, 'ownerId', owner);
        }
    },

    actions: {
        socket_joinRoom({state, commit}, data) {
            commit('joinRoom', data);

            if(data.userId == data.room.ownerId) {
                state.isOwner = true;
            } else {
                state.isOwner = false;
            }
        },

        socket_updateRoomOwner({state, commit}, owner) {
            commit('updateRoomOwner', owner);

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

        ownerId: state => {
            return state.ownerId;
        },

        userId: state => {
            return state.userId;
        },

        roomId: state => {
            return state.roomId;
        }
    }
}