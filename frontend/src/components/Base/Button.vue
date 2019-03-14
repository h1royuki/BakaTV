<template>
  <button v-on:click="$emit('send')">
    <slot></slot>
    {{text}}
  </button>
</template>
  
<script>
export default {
  props: ["text"]
};
</script>

<style>
button {
  outline: none;
  background-color: #0083b7;
  border: 1px solid #2f84a7;
  color: white;
  border-radius: 5px;
  margin: 10px;
  transition: 0.3s;
}

button:hover {
  background-color: #00798d;
  transition: 0.3s;
}
</style>


