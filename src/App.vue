<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';

import { syncThemeStoreWithLocalStorage } from '@/stores/theme';
import { useNotificationsStore } from '@/stores/notifications';

import MainBar from '@/components/bars/MainBar.vue';
import MainMenu from '@/components/menus/MainMenu.vue';
import CardLayout from '@/components/layouts/CardLayout.vue';

import config from '@/config';
import { storeToRefs } from 'pinia';

syncThemeStoreWithLocalStorage(`${config.localStoragePrefix}_theme`);

const { showSnackbar, snackbarText, snackbarColor } = storeToRefs(useNotificationsStore());

const route = useRoute();
const title = computed(() => {
  return route.meta.title ?? '';
});
</script>

<template>
  <v-app id="app">
    <MainBar />
    <MainMenu />

    <v-main>
      <CardLayout :title="title">
        <RouterView />
      </CardLayout>
    </v-main>

    <v-snackbar :color="snackbarColor" v-model="showSnackbar">
      {{ snackbarText }}
      <template v-slot:actions>
        <v-btn variant="text" @click="showSnackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<style>
html {
  overflow-y: auto;
}
</style>
