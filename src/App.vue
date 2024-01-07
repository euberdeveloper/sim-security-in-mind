<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { syncThemeStoreWithLocalStorage } from '@/stores/theme';
import { syncLanguage } from '@/stores/language';
import { syncInfoQueryParam } from '@/stores/pageInfo';

import MainBar from '@/components/bars/MainBar.vue';
import MainMenu from '@/components/menus/MainMenu.vue';
import CardLayout from '@/components/layouts/CardLayout.vue';
import SnackbarNotifications from '@/components/gears/SnackbarNotifications.vue';
import PageInfoDialog from '@/components/gears/PageInfoDialog.vue';

import config from '@/config';

syncThemeStoreWithLocalStorage(`${config.localStoragePrefix}_theme`);
syncLanguage();
syncInfoQueryParam();

const route = useRoute();
const { t } = useI18n();
const routeId = computed(() => {
  return route.name as string ?? '';
});
const title = computed(() => {
  return t(`routes.${route.meta.title}`) ?? '';
});
</script>

<template>
  <v-app id="app">
    <MainBar />
    <MainMenu />

    <v-main>
      <CardLayout :id="routeId" :title="title">
        <RouterView />
      </CardLayout>
    </v-main>

    <SnackbarNotifications />
    <PageInfoDialog />
  </v-app>
</template>

<style>
html {
  overflow-y: auto;
}
</style>
