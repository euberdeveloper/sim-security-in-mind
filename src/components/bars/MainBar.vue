<script setup lang="ts">

import { useMenuStore } from '@/stores/menu';

import DarkModeAction from '@/components/gears/bars/DarkModeAction.vue';
import ThemePrimaryColorAction from '@/components/gears/bars/ThemePrimaryColorAction.vue';
import TransitionAction from '@/components/gears/bars/TransitionAction.vue';

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
    </template>
  </v-app-bar>
</template>
