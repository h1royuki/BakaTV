<template>
  <textarea
    :value="value"
    :placeholder="placeholder ? placeholder : 'Placeholder'"
    :rows="rows ? rows : 1"
    v-on:keyup.ctrl.enter="$emit('send')"
    v-on:input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  props: ["value", "placeholder", "rows"]
};
</script>

<style>
textarea {
  background-color: #232933 !important;
  border-color: #2f333c !important;
  color: white !important;
  margin: 1px;
  resize: none;
  border-radius: 5px;
  box-shadow: none;
  outline: none;
  border: none;
  overflow: auto;
  padding: 10px;
  font-family: Google Sans;
}
</style>


