import { createRouter, createWebHistory } from 'vue-router';

import { infoGuard } from '@/router/guards/info';

import MangleTypeView from '@/views/MangleTypeView.vue';
import MangleClassIdentifierView from '@/views/MangleClassIdentifierView.vue';
import MangleClassMethodView from '@/views/MangleClassMethodView.vue';
import MangleClassConstructorView from '@/views/MangleClassConstructorView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/mangle-type'
    },
    {
      path: '/mangle-type',
      name: 'mangle-type',
      component: MangleTypeView,
      meta: {
        title: 'Mangle Type',
        info: 'MangleType'
      }
    },
    {
      path: '/mangle-class-identifier',
      name: 'mangle-class-identifier',
      component: MangleClassIdentifierView,
      meta: {
        title: 'Mangle Class Identifier',
        info: 'MangleClassIdentifier'
      }
    },
    {
      path: '/mangle-class-method',
      name: 'mangle-class-method',
      component: MangleClassMethodView,
      meta: {
        title: 'Mangle Class Method',
        info: 'MangleMethod'
      }
    },
    {
      path: '/mangle-class-constructor',
      name: 'mangle-class-constructor',
      component: MangleClassConstructorView,
      meta: {
        title: 'Mangle Class Constructor',
        info: 'MangleConstructor'
      }
    }
  ]
});

router.beforeEach(infoGuard);

export default router;
