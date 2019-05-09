<template>
  <div class="film" :style="{ margin: margin + 'px'}" @click="$emit('click')">
    <img v-if="cover" :style="{width: width + 'px', height: height + 'px' }" :src="cover" @error="replace">
    <div class="film-props" v-if="name">
      <div class="film-name" :style="{ fontSize: fontSize + 'px' }">{{name}}</div>
      <div class="film-season" v-if="season">{{season}}</div>
      <div class="film-desc" v-if="desc" v-html="desc"></div>
    </div>
  </div>
</template>

<script>
import noImg from "../assets/no_img.svg";

import "./Film.css";

export default {
  props: {
    name: String,
    desc: String,
    season: String,
    cover: { type: String},
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