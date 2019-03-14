<template>
  <div
    v-if="message.type == 'service'"
    class="message service"
  >{{ message.user == user ? 'You' : message.user }} {{message.message}}</div>
  <div v-else>
    <div class="message">
      <div
        class="name"
        :style="{color : message.color}"
      >{{ message.user == user ? 'You: ' : message.user + ':' }}</div>
      {{message.message}}
    </div>
  </div>
</template>

<script>
export default {
  props: ["message", "user"]
};
</script>

<style>
.message {
  padding: 5px 0px 5px 10px;
  margin: 5px;
  color: white;
}

.message.service {
  color: #a4a4a4;
  text-align: center;
}

.name {
  font-weight: 500;
  display: inline;
}
</style>


