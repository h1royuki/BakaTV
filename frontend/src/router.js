import Vue from 'vue';
import Router from 'vue-router';
import Index from './views/Index';
import Room from './views/Room';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      meta: {title: 'BakaTV'},
      component: Index
    },
    {
      path: '/room/:id',
      name: 'room',
      meta:{title: 'Room'},
      component: Room
    }
  ]
});
