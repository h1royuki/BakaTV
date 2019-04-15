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

<style>
input {
  padding: 12px 0;
  background-color: #4851634d;
  border: 1px solid #6c7a9680;
  color: #fff;
  border-radius: 50px;
  transition: 0.3s;
  outline: none;
  font-family: "Roboto Light", sans-serif;
}

input.error {
  border-color: #ff3e3e !important;
}

input::placeholder {
  color: #fff;
}

input:focus {
  border-color: #cdf;
  transition: 0.3s;
}
</style>

