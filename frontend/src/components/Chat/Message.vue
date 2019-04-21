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

<style>
.message {
  padding: 5px 0px 5px 10px;
  margin: 5px;
  color: white;
  word-break: break-all;
  font-size: 17px;
}

.message.service {
  color: #e1e1e1;
  text-align: center;
  background-color: #303848;
  margin: 0;
  border-left: 2px solid #6d85b4;
}

.name {
  font-weight: 500;
  display: inline;
}
</style>


