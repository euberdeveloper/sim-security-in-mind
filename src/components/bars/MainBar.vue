<script setup lang="ts">

import { useMenuStore } from '@/stores/menu';

import DarkModeAction from './actions/DarkModeAction.vue';
import ThemePrimaryColorAction from './actions/ThemePrimaryColorAction.vue';
import TransitionAction from './actions/TransitionAction.vue';
import InfoAction from './actions/InfoAction.vue';

const menuStore = useMenuStore();
const { toggleMenu } = menuStore;
</script>

<template>
  <v-app-bar color="primary">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="toggleMenu"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Lifeware Java Mangler</v-app-bar-title>

    <template v-slot:append>
      <DarkModeAction />
      <ThemePrimaryColorAction />
      <TransitionAction />
      <InfoAction />
    </template>
  </v-app-bar>
</template>
