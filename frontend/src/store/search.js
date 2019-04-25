import Vue from 'vue';

export default {
    state: {
        searchItems: null,
        searchItemsJson: {},
        selectedItems: {},
        selectedItemsLength: null,
        selectedSeasons: {}
    },

    mutations: {
        setSearchResult(state, items) {
            Vue.set(state, 'searchItemsJson', {});
            Vue.set(state, 'searchItems', items);
        },
        addSearchItemJson(state, data) {
            Vue.set(state.searchItemsJson, data.id, data.json);
        },

        select(state, item) {
            if (item instanceof Object) {
                Vue.set(state.selectedItems, item.id, Object.assign({}, item));
            }
            else {
                Vue.set(state.selectedSeasons, item, true);
            }

            state.selectedItemsLength = Object.keys(state.selectedItems).length;
        },

        unselect(state, index) {
            if (state.selectedItems[index]) {
                Vue.delete(state.selectedItems, index);
            } else {
                Vue.set(state.selectedSeasons, index, false);
            }

            state.selectedItemsLength = Object.keys(state.selectedItems).length;
        },

        resetSearch(state) {
            state.searchItems = [];
            state.searchItemsJson = {};
            state.selectedItems = {};
            state.selectedSeasons = {};
        }

    },

    actions: {
        socket_getSeriesJson({ commit }, data) {
            commit('stopLoading');
            commit('addSearchItemJson', data);
        },

        socket_searchFilms({ commit }, items) {
            commit('stopLoading');
            commit('setSearchResult', items);
        },

        select({ commit }, item) {
            commit('select', item);
        },
        unselect({ commit }, index) {
            commit('unselect', index);
        }
    },

    getters: {
        searchItems: state => {
            return state.searchItems;
        },
        searchItemsJson: state => {
            return state.searchItemsJson;
        },

        selectedItems: state => {
            return state.selectedItems;
        },

        selectedSeasons: state => {
            return state.selectedSeasons;
        },

        selectedItemsLength: state => {
            return state.selectedItemsLength;
        }
    }
}