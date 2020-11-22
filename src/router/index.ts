import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Start from '@/views/Start.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Start',
    component: Start,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/generator',
    name: 'Generator',
    component: () => import(/* webpackChunkName: "generator" */ '../views/Generator.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
