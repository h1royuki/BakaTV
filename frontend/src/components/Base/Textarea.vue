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

<style>
textarea {
  background-color: #232933 !important;
  color: white !important;
  margin: 1px;
  resize: none;
  border-radius: 5px;
  box-shadow: none;
  outline: none;
  border: 1px solid #32354a;
  overflow: auto;
  padding: 10px;
  font-family: "Roboto", sans-serif;
  transition: 0.2s;
}

textarea.error {
  border-color: #ff3e3e !important;
}

textarea:focus {
  background-color: #222730 !important;
  border-color: #969595;
  border: 1px solid;
  transition: 0.2s;
}
</style>


