<template>
  <transition name="fade">
    <div class="search">
      <div class="search-form">
        <url-input
          class="search-input"
          :type="`text`"
          :placeholder="`Search anything...`"
          v-model="query"
          v-on:enter="search()"
        />
        <start-button class="start-button" :title="`Search films`" v-on:send="search()">
          <search-icon :size="30"/>
        </start-button>
      </div>
      <div v-if="items" class="search-result">
        <div v-for="(film, index ) in items" :key="index">
          <film v-on:send="start($event)" :film="film"></film>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import Button from "./Base/Button.vue";
import Input from "./Base/Input.vue";
import SearchIcon from "vue-material-design-icons/Magnify.vue";
import Film from "./Search/Film";

export default {
  components: {
    UrlInput: Input,
    StartButton: Button,
    SearchIcon,
    Film
  },
  data() {
    return {
      query: "",
      items: null
    };
  },
  sockets: {
    searchFilms(items) {
      this.$store.commit("changeLoading");
      this.items = items;
    }
  },

  methods: {
    start(film) {
      this.$socket.emit("createRoom", film);
      this.$store.commit("changeLoading");
    },

    search() {
      this.items = null;
      this.$socket.emit("searchFilms", this.query);
      this.$store.commit("changeLoading");
    }
  }
};
</script>

<style>
.search {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
  align-items: center;
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

.search-input {
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

.search-result {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}

.search-empty {
  color: white;
  font-size: 30px;
}
</style>

