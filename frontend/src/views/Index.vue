<template>
  <div class="index">
    <div class="overlay">
      <div class="filter"></div>
      <img class="background" src="../assets/background.jpg">
    </div>
    <div class="container index">
      <div class="user-badge-container">
        <user-badge/>
      </div>
      <div class="logo"></div>
      <search-button @click="showSearch" class="search-button">Create room</search-button>
    </div>
    <search
      class="index-search"
      v-if="isShowSearch"
      v-on:close="hideSearch"
      :action-name="`Create room`"
      v-on:action="createRoom($event)"
    ></search>
  </div>
</template>

<script>
import Search from "../components/Search";
import UserBadge from "../components/User/UserBadge";
import Button from "../components/Base/Button.vue";

import "./Index.css";

export default {
  components: {
    Search,
    UserBadge,
    SearchButton: Button
  },

  data() {
    return {
      isShowSearch: false
    };
  },

  methods: {
    createRoom(items) {
      this.$socket.emit("createRoom", items);
      this.$store.commit('resetSearch');
      this.$store.commit("startLoading");
    },

    showSearch() {
      this.isShowSearch = true;
    },

    hideSearch() {
      this.isShowSearch = false;
    }
  }
};
</script>

