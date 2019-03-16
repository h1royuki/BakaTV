<template>
  <div class="index">
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="true"></loading>
    <div class="overlay">
      <div class="filter"></div>
      <img class="background" src="../assets/background.png">
    </div>
    <div class="container index">
      <img class="logo" src="../assets/logo.svg" alt>
      <div class="search-form">
        <url-input
          class="url-input"
          :type="`text`"
          :placeholder="`Search anything...`"
          v-model="query"
        ></url-input>
        <start-button class="start-button" v-on:send="search">
          <component :is="tvicon" :size="36"></component>
        </start-button>
      </div>
      <search v-if="result" v-on:send="start($event)" :items="result"></search>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Button from "../components/Base/Button.vue";
import Input from "../components/Base/Input.vue";
import Search from "../components/Index/Search";
import TvIcon from "vue-material-design-icons/YoutubeTv.vue";

export default {
  components: {
    UrlInput: Input,
    StartButton: Button,
    Search: Search,
    TvIcon: TvIcon,
    Loading
  },

  data() {
    return {
      socket: io(process.env.VUE_APP_SOCKET_STREAM_URL),
      query: "",
      result: null,
      tvicon: "tv-icon",
      isLoading: false
    };
  },

  methods: {
    start(film) {
      this.socket.emit("start", film);
      this.isLoading = true;
    },

    search() {
      this.socket.emit("search", this.query);
      this.isLoading = true;
      this.result = null;
    }
  },

  mounted() {
    document.title = this.$route.meta.title;

    this.socket.on("search", result => {
      this.result = result;
      this.isLoading = false;
    });

    this.socket.on("start", room => {
      this.$router.push(`/room/${room}`);
    });

    this.socket.on("err", text => {
      this.isLoading = false;
      this.sendError(text);
    });
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
  padding: 10px 40px;
  border-radius: 100px;
  font-size: 0;
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
}
</style>

