import Vue from 'vue';

export default {
    state: {
        userId: localStorage.getItem('userId'),
        ownerId: null,
        joined: false,
        isOwner: false,
    },
    mutations: {
        updateRoomOwner(state, owner) {
            state.ownerId = owner;
        },

        resetRoom(state) {
            state.ownerId = null;
            state.joined = false;
            state.isOwner = false;
        }
    },

    actions: {
        socket_joinRoom({ state, commit }, ownerId) {
            commit('updateRoomOwner', ownerId);

            if (state.userId == ownerId) {
                state.isOwner = true;
            } else {
                state.isOwner = false;
            }

            state.joined = true;
        },

        socket_updateRoomOwner({ state, commit }, owner) {
            commit('updateRoomOwner', owner);

            if (state.userId == owner) {
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

        isJoined: state => {
            return state.joined
        },

        ownerId: state => {
            return state.ownerId;
        },

        userId: state => {
            return state.userId;
        }
    }
}