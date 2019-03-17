import Vue from 'vue';
import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';
import Notifications from 'vue-notification'
import VueChatScroll from 'vue-chat-scroll'
import App from './App';
import router from './router';
import videoPlayer from 'vue-video-player';
import 'videojs-contrib-hls.js/src/videojs.hlsjs'
import 'video.js/dist/video-js.css';
Vue.config.productionTip = false;
Vue.use(VueSocketio, io(process.env.VUE_APP_SOCKET_URL));
Vue.use(VueChatScroll);
Vue.use(Notifications);
Vue.use(videoPlayer);

new Vue({
  router,
  created() {
    this.$options.sockets.err = (text) => {
      this.$notify({
        group: 'errors',
        type: 'error',
        duration: 3000,
        title: 'Error',
        text: text,
      });
    },
    this.$options.sockets.notFound = () => {
      this.$router.push("/");
    }
  },
  render: h => h(App)
}).$mount('#app');
