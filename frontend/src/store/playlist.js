
export default {

    state: {
        playlist: [],
        isShow: false
    },

    mutations: {
        updatePlaylist(state, playlist) {
            state.playlist = playlist;
        },

        showPlaylist(state) {
            state.isShow = true;
        },
        hidePlaylist(state) {
            state.isShow = false;
        },

        resetPlaylist(state) {
            state.playlist = [];

        }
    },

    actions: {
        socket_updatePlaylist({ commit, state, rootState }, playlist) {
            commit('updatePlaylist', playlist);
            state.length = Object.keys(playlist.films).length;
            rootState.loading = false;
        }
    },
    getters: {
        playlist: state => {
            return state.playlist;
        },

        isShowPlaylist: state => {
            return state.isShow;
        }
    }
}