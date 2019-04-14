
export default {

    state: {
        playlist: [],
        isShow: false,
        length: 0
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
        },

        playlistLength: state => {
            return state.length;
        }
    }
}