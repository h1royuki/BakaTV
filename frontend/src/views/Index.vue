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

<style>
.overlay {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.filter {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(36, 39, 47, 0.96) 0%,
    rgba(36, 39, 47, 0.96) 65%,
    rgba(36, 39, 47, 0.85) 100%
  );
}

.background {
  position: fixed;
  left: 0;
  bottom: -7px;
  z-index: -3;
}

.logo {
  width: 70%;
  min-height: 400px;
  margin-top: 50px;
  background-image: url("../assets/logo.svg");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  filter: brightness(0.7);
}

.container.index {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  margin: 0 auto;
  z-index: 0;
}

.index .search-button {
  margin-top: 80px;
  font-size: 20px;
  padding: 20px 50px;
  border-radius: 100px;
}

.user-badge-container {
  position: absolute;
  top: 20px;
  right: 20px;
}

@media (max-width: 800px) {
  .user-badge-container {
    position: relative;
    right: 0;
  }

  .logo {
    width: 70%;
    height: 100%;
    min-height: 300px;
  }
}
</style>

