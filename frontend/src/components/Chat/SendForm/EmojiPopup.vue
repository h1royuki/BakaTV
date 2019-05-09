<template>
  <transition name="fade">
    <div v-on-clickaway="hide" class="emoji-picker">
      <VEmojiPicker :labelSearch="`Search...`" :showCategory="true" :pack="pack" @select="select"/>
    </div>
  </transition>
</template>

<script>
import VEmojiPicker from "v-emoji-picker";
import packData from "v-emoji-picker/data/emojis.json";
import { directive as onClickaway } from "vue-clickaway";

import "./EmojiPopup.css";

export default {
  components: {
    VEmojiPicker
  },

  data() {
    return {
      pack: packData
    };
  },

  methods: {
    hide() {
      this.$emit("hide");
    },

    select(emoji) {
      this.$emit("select", emoji.emoji);
    }
  },

  directives: {
    onClickaway: onClickaway
  }
};
</script>


