<template>
  <div class="index">
    <div class="overlay">
      <div class="filter"></div>
      <img class="background" src="../assets/background.jpg">
    </div>
    <div class="container index">
      <div class="logo"></div>
      <search class="index-search" v-on:select="start($event)">
        <template v-slot:cover-icon>
          <play-icon :size="60" title="Create room" />
        </template>
      </search>
    </div>
  </div>
</template>

<script>
import Search from "../components/Search";
import PlayIcon from "vue-material-design-icons/Play.vue";

export default {
  components: {
    Search,
    PlayIcon
  },

  methods: {
    start(film) {
      this.$socket.emit("createRoom", film);
      this.$store.commit("changeLoading");
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

.index-search {
  margin-top: 40px;
}

@media (max-width: 800px) {
  .logo {
    width: 70%;
    height: 100%;
    min-height: 300px;
  }
}
</style>

