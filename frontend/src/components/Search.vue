<template>
  <transition name="fade">
    <div class="search">
      <div class="search-form">
        <url-input
          class="search-input"
          :type="`text`"
          :placeholder="`Search films...`"
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
  font-size: 0;
  position: absolute;
  right: 2px;
  top: 0px;
  color: #dbdbdb;
  padding: 5px 20px;
  border-radius: 50px;
  background-color: #2e5e89;
  border: 1px solid #2e5e89;
  margin: 6px;
}

.start-button:hover {
  background-color: #2e5e89;
  border: 1px solid #2e5e89;
  transform: scale(1.05);
}

.search-input {
  width: 100%;
  font-size: 25px;
  text-align: center;
  background-color: rgba(72, 81, 99, 0.3);
  border: 1px solid transparent;
  max-height: 29px;
}

.search-input:focus {
  border-color: #696969;
  transition: 0.3s;
  background-color: rgba(72, 81, 99, 0.75);
}

.search-form {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  align-content: center;
  width: 85%;
  max-width: 750px;
  position: relative;
  margin: 60px 0;
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

