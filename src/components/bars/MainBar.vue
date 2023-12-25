<script setup lang="ts">
import { useMenuStore } from '@/stores/menu';
const menuStore = useMenuStore();
const { toggleMenu } = menuStore;
</script>

<template>
  <v-app-bar color="primary" clipped-left dark app>
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="toggleMenu"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Lifeware Java Mangler</v-app-bar-title>
  </v-app-bar>
</template>
