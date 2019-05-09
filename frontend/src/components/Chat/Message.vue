<template>
  <transition name="fade">
    <div
      v-if="message.type == 'service'"
      class="message service"
    >{{ message.name }} {{message.message}}</div>
    <div v-else class="message">
      <div class="name" :style="{color : message.color}">{{ `${message.name}:` }}</div>
      {{message.message}}
    </div>
  </transition>
</template>

<script>
import "./Message.css";

export default {
  props: {
    message: { type: Object, required: true }
  },

  computed: {
    id() {
      return this.$store.getters.userId;
    }
  }
};
</script>

