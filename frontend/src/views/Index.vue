<template>
  <div class="index">
    <div class="overlay">
      <div class="filter"></div>
      <img class="background" src="../assets/background.jpg">
    </div>
    <div class="container index">
      <div class="user-badge-container">
        <div class="user-badge">
          <account-icon class="user" :size="26"/>
          {{userName}}
         <!-- <arrow-down-icon class="arrow" :size="30"/>
          <transition name="fade">
          <div class="dropdown" v-on-clickaway="hideRooms" v-if="isShowRooms">
            <p class="category">Created rooms</p>
          </div>
          </transition>
          -->
        </div>
      </div>
      <div class="logo"></div>
      <search class="index-search" v-on:select="start($event)">
        <template v-slot:cover-icon>
          <play-icon :size="60" title="Create room"/>
        </template>
      </search>
    </div>
  </div>
</template>

<script>
import Search from "../components/Search";
import AccountIcon from "vue-material-design-icons/AccountCircleOutline.vue";
import PlayIcon from "vue-material-design-icons/Play.vue";
import ArrowDownIcon from "vue-material-design-icons/ChevronDown";
import { directive as onClickaway } from "vue-clickaway";

export default {
  components: {
    Search,
    PlayIcon,
    AccountIcon,
    ArrowDownIcon
  },

  data() {
    return {
      isShowRooms: false
    };
  },

  methods: {
    start(film) {
      this.$socket.emit("createRoom", film);
      this.$store.commit("startLoading");
    },

    showRooms() {
      this.isShowRooms = true;
    },

    hideRooms() {
      this.isShowRooms = false;
    }
  },

  computed: {
    userName() {
      return this.$store.getters.userName;
    }
  },
  directives: {
    onClickaway
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

.user-badge-container {
  position: absolute;
  top: 20px;
  right: 20px;
}

.user-badge {
  position: relative;
  padding: 7px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(72, 81, 99, 0.3);
  font-size: 18px;
  border-radius: 50px;
}

.user-badge .user {
  padding-top: 6px;
  padding-right: 10px;
}

.user-badge .arrow {
  padding-top: 7px;
  padding-left: 5px;
}

.user-badge .dropdown {
  position: absolute;
  top: 65px;
  background-color: #2e323d;
  width: calc(100% - 45px);
  border-radius: 15px;
  padding: 0 20px;
  z-index: 2;
}

.dropdown .category {
  font-size: 15px;
  text-transform: uppercase;
  color: #666e83;
}

.index-search {
  margin-top: 40px;
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

