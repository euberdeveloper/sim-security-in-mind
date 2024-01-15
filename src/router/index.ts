import { createRouter, createWebHistory } from 'vue-router';

import { availableLanguages } from '@/stores/language';

import { localeGuard } from './guards/locale';
import { infoGuard } from './guards/info';
import { headGuard } from './guards/head';

const LanguageProxy = () => import('@/views/LanguageProxy.vue');
const NotFoundView = () => import('@/views/NotFoundView.vue');

const MangleTypeView = () => import('@/views/MangleTypeView.vue');
const MangleClassIdentifierView = () => import('@/views/MangleClassIdentifierView.vue');
const MangleClassMethodView = () => import('@/views/MangleClassMethodView.vue');
const MangleClassConstructorView = () => import('@/views/MangleClassConstructorView.vue');
const PreferencesView = () => import('@/views/PreferencesView.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: `/:locale(${availableLanguages.join('|')})?`,
      redirect: { name: 'mangle-type' },
      component: LanguageProxy,
      meta: {
        description: 'root',
      },
      children: [
        {
          path: 'mangle',
          name: 'mangle',
          redirect: { name: 'mangle-type' },
          meta: {
            description: 'mangle',
          },
          children: [
            {
              path: 'mangle-type',
              name: 'mangle-type',
              component: MangleTypeView,
              meta: {
                title: 'mangle-type',
                info: 'mangle-type'
              }
            },
            {
              path: 'mangle-class-identifier',
              name: 'mangle-class-identifier',
              component: MangleClassIdentifierView,
              meta: {
                title: 'mangle-class-identifier',
                info: 'mangle-class-identifier'
              }
            },
            {
              path: 'mangle-class-method',
              name: 'mangle-class-method',
              component: MangleClassMethodView,
              meta: {
                title: 'mangle-class-method',
                info: 'mangle-method'
              }
            },
            {
              path: 'mangle-class-constructor',
              name: 'mangle-class-constructor',
              component: MangleClassConstructorView,
              meta: {
                title: 'mangle-class-constructor',
                info: 'mangle-constructor'
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
router.beforeEach(headGuard);
router.beforeEach(infoGuard);

export default router;
