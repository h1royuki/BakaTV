import Vue from 'vue';
import Notifications from 'vue-notification'
import VueChatScroll from 'vue-chat-scroll'
import App from './App';
import router from './router';
import videoPlayer from 'vue-video-player';
import 'videojs-contrib-hls.js/src/videojs.hlsjs'
import 'video.js/dist/video-js.css';

Vue.config.productionTip = false;
Vue.use(VueChatScroll);
Vue.use(Notifications);
Vue.use(videoPlayer);


Vue.mixin({
  methods: {
      sendError(text) {
          this.$notify({
              group: 'errors',
              type: 'error',
              duration: 3000,
              title: 'Error',
              text: text,
          });
      }
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
