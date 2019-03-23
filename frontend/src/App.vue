<template>
  <div id="app">
    <notifications group="errors"></notifications>
    <notifications group="notify"></notifications>
    <transition name="fade">
    <router-view/>
    </transition>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto');

body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  background-color: #232935;
}
.notifications {
  top: 40px !important;
  right: 40px !important;
}

.vue-notification {
  font-family: 'Roboto', sans-serif !important;
  font-size: 15px !important;
  border-radius: 15px;
  padding: 20px;
  margin: 20px !important;
  padding: 20px !important;
}

.error {
  background: #e54d42;
  border: 1px solid #ff6f64 !important;
}

.notify {
  background: #0083b7;
  border: 1px solid #55cdeb !important;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}

@media (max-width: 800px) {
  .notifications {
    top: 0 !important;
    right: 0 !important;
    width: 100% !important;
  }
  .vue-notification {
    font-size: 15px;
    border-radius: 0;
    margin: 0 !important;
  }
}
</style>

