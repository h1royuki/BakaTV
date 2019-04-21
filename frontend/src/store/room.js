export default {
    state: {
        joined: false,
        isOwner: false,
        isCreator: false
    },
    mutations: {
        joinToRoom(state, data) {
            state.isOwner = data.owner;
            state.isCreator = data.creator;
            state.joined = true;
        },

        resetRoom(state) {
            state.joined = false;
            state.isOwner = false;
            state.isCreator = false;
        }
    },

    actions: {
        socket_joinRoom({ commit }, data) {
            commit('joinToRoom', data);
        },
        socket_updateRoomOwner({ state }) {
            state.isOwner = true;
        }
    },

    getters: {
        isOwner: state => {
            return state.isOwner;
        },

        isJoined: state => {
            return state.joined
        },

        isCreator: state => {
            return state.isCreator;
        }
    }
}