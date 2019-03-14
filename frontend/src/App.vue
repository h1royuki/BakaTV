<template>
  <div id="app">
    <notifications group="errors"></notifications>
    <router-view/>
  </div>
</template>

<style>
body {
  font-family: Google Sans;
  margin: 0;
}

.notification-wrapper {
  margin: 30px -20px;
}

.vue-notification.error {
  background: #e54d42;
  border: 1px solid #ff6f64;
  font-size: 15px;
  border-radius: 15px;
  padding: 20px;
}
</style>

