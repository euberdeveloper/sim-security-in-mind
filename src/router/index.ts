import { createRouter, createWebHistory } from 'vue-router';

import { localeGuard } from '@/router/guards/locale';
import { infoGuard } from '@/router/guards/info';

import MangleTypeView from '@/views/MangleTypeView.vue';
import MangleClassIdentifierView from '@/views/MangleClassIdentifierView.vue';
import MangleClassMethodView from '@/views/MangleClassMethodView.vue';
import MangleClassConstructorView from '@/views/MangleClassConstructorView.vue';
import PreferencesView from '@/views/PreferencesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:locale?',
      redirect: { name: 'mangle-type' },
      children: [
        {
          path: 'mangle/mangle-type',
          name: 'mangle-type',
          component: MangleTypeView,
          meta: {
            title: 'mangle-type',
            info: 'mangle-type'
          }
        },
        {
          path: 'mangle/mangle-class-identifier',
          name: 'mangle-class-identifier',
          component: MangleClassIdentifierView,
          meta: {
            title: 'mangle-class-identifier',
            info: 'mangle-class-identifier'
          }
        },
        {
          path: 'mangle/mangle-class-method',
          name: 'mangle-class-method',
          component: MangleClassMethodView,
          meta: {
            title: 'mangle-class-method',
            info: 'mangle-method'
          }
        },
        {
          path: 'mangle/mangle-class-constructor',
          name: 'mangle-class-constructor',
          component: MangleClassConstructorView,
          meta: {
            title: 'mangle-class-constructor',
            info: 'mangle-constructor'
          }
        },
        {
          path: 'preferences',
          name: 'preferences',
          component: PreferencesView,
          meta: {
            title: 'preferences',
            info: 'preferences'
          }
        }
      ]
    }
  ]
});

router.beforeEach(localeGuard);
router.beforeEach(infoGuard);

export default router;
