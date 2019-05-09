<template>
  <textarea
    :value="value"
    :placeholder="placeholder ? placeholder : 'Placeholder'"
    :rows="rows ? rows : 1"
    :class="{error: isValid(value)}"
    v-on:keyup.ctrl.enter="$emit('enter')"
    v-on:input="$emit('input', $event.target.value);"
  />
</template>

<script>

import "./Textarea.css";

export default {
  props: {
    value: { type: String },
    placeholder: { type: String, default: "Placeholder" },
    rows: { type: Number, default: 1 },
    maxChars: { type: Number, default: 300 }
  },

  methods: {
    isValid(value) {
      return value.length > this.maxChars;
    }
  }
};
</script>
