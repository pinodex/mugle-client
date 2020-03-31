import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    name: 'index',
    path: '/',
    component: () => import('@/views/Index.vue'),
  },
  {
    name: 'chat',
    path: '/chat',
    component: () => import('@/views/Chat.vue'),
  },
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
