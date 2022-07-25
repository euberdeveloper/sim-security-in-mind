import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import MangleTypeView from '@/views/MangleTypeView.vue';
import MangleClassIdentifierView from '@/views/MangleClassIdentifierView.vue';
import MangleClassMethodView from '@/views/MangleClassMethodView.vue';
import MangleClassConstructorView from '@/views/MangleClassConstructorView.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/mangle-type'
  },
  {
    path: '/mangle-type',
    name: 'mangle-type',
    component: MangleTypeView
  },
  {
    path: '/mangle-class-identifier',
    name: 'mangle-class-identifier',
    component: MangleClassIdentifierView
  },
  {
    path: '/mangle-class-method',
    name: 'mangle-class-method',
    component: MangleClassMethodView
  },
  {
    path: '/mangle-class-constructor',
    name: 'mangle-class-constructor',
    component: MangleClassConstructorView
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
