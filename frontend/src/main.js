import Vue from 'vue';
import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';
import Notifications from 'vue-notification'
import VueChatScroll from 'vue-chat-scroll'
import Popover from 'vue-js-popover'
import videoPlayer from 'vue-video-player';

import App from './App';
import router from './router';
import store from './store'

import 'video.js/dist/video-js.css';

const socketio = io(process.env.VUE_APP_SOCKET_URL, {
  query: {
    userId: localStorage.getItem('userId'),
    userToken: localStorage.getItem('userToken')
  }
})

Vue.config.productionTip = false;
Vue.use(VueSocketio, socketio, { store: store });
Vue.use(VueChatScroll);
Vue.use(Notifications);
Vue.use(videoPlayer);
Vue.use(Popover)


router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = to.meta.title;
  });
});

new Vue({
  router,
  store,
  created() {
    this.$options.sockets.err = (text) => {
      this.$notify({
        group: 'errors',
        type: 'error',
        duration: 3000,
        title: 'Error',
        text: text,
      });

      if (this.$store.getters.isLoading) {
        this.$store.commit('stopLoading');
      }
    },
      this.$options.sockets.notify = (text) => {
        this.$notify({
          group: 'notify',
          type: 'notify',
          duration: 3000,
          title: 'Notification',
          text: text,
        });
      },
      this.$options.sockets.notFound = () => {
        this.$router.push("/");
      }
  },
  render: h => h(App)
}).$mount('#app');
