<template>
  <transition name="fade">
    <div v-on-clickaway="hide" class="emoji-picker">
      <VEmojiPicker
        :labelSearch="`Search...`"
        :showCategory="true"
        :pack="pack"
        @select="select"
      />
    </div>
  </transition>
</template>

<script>
import VEmojiPicker from "v-emoji-picker";
import packData from "v-emoji-picker/data/emojis.json";
import { directive as onClickaway } from "vue-clickaway";

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
          this.$emit('hide');
      },
      
      select(emoji) {
          this.$emit('select', emoji.emoji);
      }
  },

  directives: {
    onClickaway: onClickaway
  }
};
</script>

<style>
.emoji-picker {
  position: absolute;
  bottom: 150px;
  right: 10px;
}

.grid-emojis {
  color: #b7b7b7 !important;
}

.container-search input {
  background: #1c212a !important;
  border: 1px solid #1c212a !important;
}

#Categories {
  border-bottom-color: #1c212a !important;
  background: #1c212a !important;
  color: #fff !important;
}

#EmojiPicker {
  background: #29303c !important;
  border-color: #1c212a !important;
}

.category.active {
  border-bottom-color: #2e5e89 !important;
}
</style>


