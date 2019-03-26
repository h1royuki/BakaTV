import Vue from 'vue';

export default {
    state: {
        room: {
            filmName: null,
            status: null,
            isOwner: false
        },
        player: {
            overNative: true,
            autoplay: true,
            controls: false,
            sources: []
        }
    },
    mutations: {
        SOCKET_ROOMJOIN(state, room) {
            state.player.sources.push({
                withCredentials: false,
                type: "application/x-mpegURL",
                src: process.env.VUE_APP_STREAM_URL + room.streamId + ".m3u8"
            });
            

            Vue.set(state.room, 'filmName', room.filmName);
            Vue.set(state.room, 'status', room.status);
            Vue.set(state.room, 'isOwner', room.isOwner);
        },

        SOCKET_SETOWNER(state) {
            Vue.set(state.room, 'isOwner', true);
        },  

        SOCKET_STREAMCONTROL(state, status) {
            Vue.set(state.room, 'status', status);
        }
    },

    actions: {
        socket_roomJoin({ commit }, room) {
            commit('SOCKET_ROOMJOIN', room);
            document.title = `[${room.status}] ${room.filmName}`;
        },

        socket_streamControl({ state, commit }, status) {
            commit('SOCKET_STREAMCONTROL', status);
            document.title = `[${status}] ${state.room.filmName}`;
        }
    },

    getters: {

        player: state => {
            return state.player;
        },

        room: state => {
            return state.room;
        },
        status: state => {
            return state.room.status;
        },
        isOwner: state => {
            return state.room.isOwner;
        }
    }
}