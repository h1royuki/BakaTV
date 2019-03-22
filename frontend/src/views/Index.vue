<template>
  <div class="index">
    <loading 
    :active.sync="isLoading" 
    :can-cancel="false" 
    :is-full-page="true"
    :color="`#fff`"
    :background-color="`#000`"
    ></loading>
    <div class="overlay">
      <div class="filter"></div>
      <img class="background" src="../assets/background.jpg">
    </div>
    <div class="container index">
      <img class="logo" src="../assets/logo.svg">
      <div class="search-form">
        <url-input
          class="url-input"
          :type="`text`"
          :placeholder="`Search anything...`"
          v-model="query"
          v-on:enter="search()"
        />
        <start-button class="start-button" :title="`Search films`" v-on:send="search()">
          <search-icon :size="30"/>
        </start-button>
      </div>
      <search v-if="result" v-on:send="start($event)" :items="result"></search>
    </div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Button from "../components/Base/Button.vue";
import Input from "../components/Base/Input.vue";
import Search from "../components/Index/Search";
import SearchIcon from "vue-material-design-icons/Magnify.vue";

export default {
  components: {
    UrlInput: Input,
    StartButton: Button,
    Search,
    SearchIcon,
    Loading
  },

  data() {
    return {
      query: "",
      result: null,
      isLoading: false
    };
  },
  sockets: {
    searchFilms(result) {
      this.result = result;
      this.isLoading = false;
    },

    streamStart(room) {
      this.$router.push(`/room/${room}`);
    },

    err() {
      this.isLoading = false;
    }
  },
  methods: {
    start(film) {
      this.$socket.emit("streamStart", film);
      this.isLoading = true;
    },

    search() {
      this.$socket.emit("searchFilms", this.query);
      this.isLoading = true;
      this.result = null;
    }
  },

  mounted() {
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
    rgba(56, 64, 81, 0.5) 0%,
    rgb(35, 41, 53) 100%
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
  margin: 20px;
  max-width: 450px;
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

.start-button {
  padding: 0;
  font-size: 0;
  position: absolute;
  right: 26px;
  top: 1px;
  background-color: transparent;
  border: 0;
  color: #dbdbdb;
}

.start-button:hover {
  background-color: transparent;
  color: #fff;
  transform: scale(1.05);
}

.url-input {
  margin: 0 10px;
  width: 95%;
  max-width: 700px;
  font-size: 20px;
  text-align: center;
}

.search-form {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  align-content: center;
  width: 100%;
  max-width: 700px;
  margin-bottom: 50px;
  position: relative;
}
</style>

