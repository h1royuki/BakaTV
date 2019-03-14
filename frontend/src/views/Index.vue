<template>
  <div class="index">
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="true"></loading>
    <div class="overlay">
      <div class="filter"></div>
      <img class="background" src="../assets/background.png">
    </div>
    <div class="container index">
      <img class="logo" src="../assets/logo.svg" alt>
      <url-input class="url-input" :type="`text`" :placeholder="`Enter URL to movie`" v-model="url"></url-input>
      <start-button class="start-button" v-on:send="sendUrl">
        <component :is="tvicon" :size="36"></component>
      </start-button>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Button from "../components/Base/Button.vue";
import Input from "../components/Base/Input.vue";
import TvIcon from "vue-material-design-icons/YoutubeTv.vue";

export default {
  components: {
    UrlInput: Input,
    StartButton: Button,
    TvIcon: TvIcon,
    Loading
  },

  data() {
    return {
      socket: io(process.env.VUE_APP_SOCKET_STREAM_URL),
      url: "",
      tvicon: "tv-icon",
      isLoading: false
    };
  },

  methods: {
    sendUrl() {
      this.socket.emit("start", this.url);
      this.isLoading = true;
    }
  },

  mounted() {
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
  max-width: 650px;
  margin: 0 auto;
  z-index: 0;
}

.start-button {
  text-transform: uppercase;
  padding: 20px;
  border-radius: 100px;
  font-size: 0;
  margin-top: 40px;
}

.url-input {
  margin: 20px;
  width: 95%;
  font-size: 20px;
  text-align: center;
}
</style>

