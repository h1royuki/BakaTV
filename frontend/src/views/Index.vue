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
      <div class="logo"></div>
      <search></search>
    </div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Search from "../components/Search";

export default {
  components: {
    Search,
    Loading
  },

  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
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

@media (max-width: 800px) {
  .logo {
    width: 70%;
    height: 100%;
    min-height: 300px;
  }
}
</style>

