<template>
  <button :title="title" @click="$emit('click')">
    <slot></slot>
  </button>
</template>
  
<script>
export default {
  props: {
    title: {type: String, default: 'Button'},

  }
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
  position: relative;
}

button:focus {
  outline: 0;
}

button:hover {
  cursor: pointer;
}

button:hover {
  background-color: #00798d;
  transition: 0.3s;
}
</style>


