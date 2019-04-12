
export default {

    state: {
        playlist: [],
        isShow: false,
    },

    mutations: {
        getPlaylist(state, playlist) {
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
        socket_getPlaylist({ commit, rootState }, playlist) {
            commit('getPlaylist', playlist);
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