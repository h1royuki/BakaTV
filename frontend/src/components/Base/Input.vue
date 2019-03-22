<template>
  <input
    :value="value"
    :type="type ? type : 'text'"
    :placeholder="placeholder ? placeholder : 'Placeholder'"
    @input="$emit('input', $event.target.value)"
    v-on:keydown.enter="$emit('enter')"
  >
</template>

<script>
export default {
  props: ["value", "type", "placeholder"]
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
}

input::placeholder {
  color: #fff;
}

input:focus {
  border-color: #cdf;
  transition: 0.3s;
}
</style>

