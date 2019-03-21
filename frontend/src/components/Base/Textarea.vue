<template>
  <textarea
    :value="value"
    :placeholder="placeholder ? placeholder : 'Placeholder'"
    :rows="rows ? rows : 1"
    v-on:keyup.ctrl.enter="$emit('enter')"
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
  color: white !important;
  margin: 1px;
  resize: none;
  border-radius: 5px;
  box-shadow: none;
  outline: none;
  border: 1px solid transparent;
  overflow: auto;
  padding: 10px;
  font-family: Google Sans;
  transition: 0.2s;
}

textarea:focus {
  background-color: #232933 !important;
  border-color: #241a1a !important;
  border: 1px solid;
  transition: 0.2s;
}
</style>


