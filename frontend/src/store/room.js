import Vue from 'vue';

export default {
    state: {
        joined: false,
        ownerId: null,
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
        socket_joinRoom({ state, commit, rootState }, ownerId) {
            commit('updateRoomOwner', ownerId);

            if (rootState.userId == ownerId) {
                state.isOwner = true;
            } else {
                state.isOwner = false;
            }

            state.joined = true;
        },

        socket_updateRoomOwner({ state, commit, rootState }, owner) {
            commit('updateRoomOwner', owner);

            if (rootState.userId == owner) {
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
        }
    }
}