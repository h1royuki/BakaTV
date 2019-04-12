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
  border: 1px solid #32354a;
  overflow: auto;
  padding: 10px;
  font-family: "Roboto", sans-serif;
  transition: 0.2s;
}

textarea:focus {
  background-color: #222730 !important;
  border-color: #969595 !important;
  border: 1px solid;
  transition: 0.2s;
}
</style>


