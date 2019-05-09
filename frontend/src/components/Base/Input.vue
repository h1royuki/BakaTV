<template>
  <input
    :value="value"
    :type="type"
    :placeholder="placeholder"
    :class="{error: isValid(value)}"
    @input="$emit('input', $event.target.value)"
    v-on:keydown.enter="$emit('enter')"
  >
</template>

<script>
import "./Input.css";

export default {
  props: {
    value: { type: String },
    type: { type: String, default: "text" },
    placeholder: { type: String, default: "Placeholder" },
    maxChars: { type: Number, default: 30 }
  },

  methods: {
    isValid(value) {
      return value.length > this.maxChars;
    }
  }
};
</script>