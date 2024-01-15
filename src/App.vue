<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue';
import { useHead } from '@unhead/vue'

import {titleTemplate} from '@/plugins/unhead';

import { syncThemeStoreWithLocalStorage } from '@/stores/theme';
import { syncLanguage } from '@/stores/language';

import MainBar from '@/components/bars/MainBar.vue';
import MainMenu from '@/components/menus/MainMenu.vue';
import SnackbarNotifications from '@/components/gears/SnackbarNotifications.vue';
import PageInfoDialog from '@/components/gears/PageInfoDialog.vue';

import config from '@/config';

useRegisterSW({
  immediate: true
})

syncThemeStoreWithLocalStorage(`${config.localStoragePrefix}_theme`);
syncLanguage();

useHead({
  titleTemplate
});
</script>

<template>
  <v-app id="app">
    <MainBar />
    <MainMenu />

    <v-main>
      <router-view />
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
