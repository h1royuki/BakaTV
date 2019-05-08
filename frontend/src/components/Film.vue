<template>
  <div class="film" :style="{ margin: margin + 'px'}" @click="$emit('click')">
    <img :style="{width: width + 'px', height: height + 'px' }" :src="cover" @error="replace">
    <div class="film-props" v-if="name">
      <div class="film-name" :style="{ fontSize: fontSize + 'px' }">{{name}}</div>
      <div class="film-season" v-if="season">{{season}}</div>
      <div class="film-desc" v-if="desc" v-html="desc"></div>
    </div>
  </div>
</template>

<script>
import noImg from "../assets/no_img.svg";

export default {
  props: {
    name: String,
    desc: String,
    season: String,
    cover: { type: String, required: true },
    width: { type: Number, default: 60 },
    height: { type: Number, default: 80 },
    fontSize: { type: Number, default: 15 },
    margin: { type: Number, default: 0 }
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
  flex-direction: row;
  position: relative;
  align-items: center;
  overflow: hidden;
}

.film img {
  border-radius: 8px;
}

.film-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #000000b3;
  z-index: 1;
  opacity: 0;
  color: white;
  align-items: center;
  display: flex;
  justify-content: center;
}

.film-props {
  width: 100%;
  bottom: 0;
  margin-left: 20px;
}

.film-name {
  width: 250px;
  font-size: 15px;
  color: white;
}


.film-season, .film-desc {
  font-size: 15px;
}
</style>

