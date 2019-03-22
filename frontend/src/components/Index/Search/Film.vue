<template>
  <div v-if="film" class="film" @click="$emit('send', film)">
    <img class="film-poster" :src="film.cover" @error="replace">
    <div class="film-overlay">
      <search-icon :size="128"/>
    </div>
    <div class="film-props">
      <div class="film-name">{{film.name}}</div>
    </div>
  </div>
</template>

<script>
import SearchIcon from "vue-material-design-icons/Play.vue";
import noImg from "../../../assets/no_img.svg";
export default {
  props: ["film"],
  components: {
    SearchIcon
  },
  methods: {
    replace(e) {
      e.target.src = noImg;
    }
  }
};
</script>

<style>
.film {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 10px 10px;
  max-width: 240px;
  width: 170px;
  height: 260px;
  position: relative;
  box-shadow: 0 -10px 30px 1px #0003;
  border-radius: 10px;
  overflow: hidden;
}

.film:hover {
  cursor: pointer;
}

.film-poster {
  width: 170px;
  height: 260px;
}

.film-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: black;
  z-index: 10;
  position: absolute;
  width: 100%;
  height: 100%;
  background: #000000b3;
  z-index: 10;
  border-radius: 9px;
  opacity: 0;
  color: white;
  align-items: center;
  display: flex;
  justify-content: center;
  transition: 0.3s;
}

.film-overlay:hover {
  opacity: 1;
  transition: 0.3s;
}

.film-props {
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: #000c;
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;
}

.film-name {
  font-size: 15px;
  color: white;
  padding: 5px;
  text-align: center;
}

.film-desc {
  color: #a7a4a4;
  text-align: center;
  font-size: 15px;
  padding: 5px;
}
</style>

