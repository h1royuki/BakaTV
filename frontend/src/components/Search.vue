<template>
  <div class="search">
    <div class="search-form">
      <url-input
        class="search-input"
        :class="{small: small}"
        :type="`text`"
        :placeholder="`Search films...`"
        v-model="query"
        v-on:enter="search()"
      />
      <start-button
        class="start-button"
        :class="{small: small}"
        :title="`Search films...`"
        @click="search()"
      >
        <search-icon :size="small ? 20 : 30"/>
      </start-button>
    </div>
    <div v-if="items" class="search-result" :class="{scroll : scroll}">
      <div v-for="(film, index ) in items" :key="index">
        <film
          :width="small ? 100 : 150"
          :height="small ? 145 : 213"
          :margin="small ? 10 : 20"
          :font-size="small ? 13 : 15"
          @click="$emit('select', film)"
          :cover="film.cover"
          :name="film.name"
        >
          <template v-slot:cover-icon>
            <slot name="cover-icon"></slot>
          </template>
        </film>
      </div>
    </div>
  </div>
</template>
<script>
import Button from "./Base/Button.vue";
import Input from "./Base/Input.vue";
import SearchIcon from "vue-material-design-icons/Magnify.vue";
import Film from "./Room/Film";

export default {
  props: {
    scroll: { type: Boolean, default: false },
    small: { type: Boolean, default: false }
  },

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

.start-button.small {
  border-radius: 8px;
  padding: 5px 10px;
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

.search-input.small {
  font-size: 20px;
  border-radius: 8px;
  max-height: 18px;
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
  max-width: 650px;
  position: relative;
}

.search-result {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 40px;
}

.search-result.scroll {
  max-height: 335px;
  overflow: auto;
  width: 100%;
  padding-top: 20px;
}

.search-empty {
  color: white;
  font-size: 30px;
}

@media (max-width: 500px) {
  .search-input {
    text-align: left;
    padding-left: 20px;
  }
}
</style>

