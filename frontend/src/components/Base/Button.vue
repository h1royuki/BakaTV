<template>
  <button :title="title" @click="$emit('click')">
    <slot></slot>
  </button>
</template>
  
<script>
import "./Button.css";

export default {
  props: {
    title: {type: String, default: 'Button'},

  }
};
</script>

