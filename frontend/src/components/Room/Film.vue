<template>
  <div class="film" :style="{ margin: margin + 'px'}" @click="$emit('click')">
    <img :style="{width: width + 'px', height: height + 'px' }" :src="cover" @error="replace">
    <div class="film-overlay">
      <slot name="cover-icon"></slot>
    </div>
    <div class="film-props" v-if="name">
      <div class="film-name" :style="{ fontSize: fontSize + 'px' }">{{name}}</div>
    </div>
  </div>
</template>

<script>
import noImg from "../../assets/no_img.svg";

export default {
  props: {
    name: String,
    cover: { type: String, required: true },
    width: { type: Number, default: 100 },
    height: { type: Number, default: 145 },
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
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
  box-shadow: 0 -10px 20px 0 #0000001a;
  border-radius: 6px;
  overflow: hidden;
}

.film:hover {
  cursor: pointer;
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
  z-index: 1;
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
}

.film-name {
  font-size: 15px;
  color: white;
  padding: 5px;
  text-align: center;
}
</style>

