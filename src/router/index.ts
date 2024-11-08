import { createRouter, createWebHistory } from 'vue-router';

import { availableLanguages } from '@/stores/language';

import { localeGuard } from './guards/locale';
import { infoGuard } from './guards/info';

const LanguageProxy = () => import('@/views/LanguageProxy.vue');
const NotFoundView = () => import('@/views/NotFoundView.vue');

const DevicesView = () => import('@/views/DevicesView.vue');
const PreferencesView = () => import('@/views/PreferencesView.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: `/:locale(${availableLanguages.join('|')})?`,
      redirect: { name: 'devices' },
      component: LanguageProxy,
      meta: {
        description: 'root'
      },
      children: [
        {
          path: 'mangle',
          name: 'mangle',
          redirect: { name: 'devices' },
          meta: {
            description: 'mangle'
          },
          children: [
            {
              path: 'devices',
              name: 'devices',
              component: DevicesView,
              meta: {
                title: 'devices',
                info: 'devices'
              }
            }
          ]
        },
        {
          path: 'preferences',
          name: 'preferences',
          component: PreferencesView,
          meta: {
            title: 'preferences',
            description: 'preferences',
            info: 'preferences'
          }
        },
        {
          path: ':pathMatch(.*)*',
          name: 'not-found',
          component: NotFoundView,
          meta: {
            title: {
              text: 'not-found',
              position: 'center',
              case: 'uppercase',
              bold: true
            }
          }
        }
      ]
    }
  ]
});

router.beforeEach(localeGuard);
router.beforeEach(infoGuard);

export default router;
