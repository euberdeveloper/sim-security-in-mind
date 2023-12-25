<script setup lang="ts">
import { useMenuStore } from '@/stores/menu';
import { useThemeStore } from '@/stores/theme';

const menuStore = useMenuStore();
const { toggleMenu } = menuStore;

const themeStore = useThemeStore();
const { toggleTheme } = themeStore;
</script>

<template>
  <v-app-bar color="primary" clipped-left dark app>
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="toggleMenu"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Lifeware Java Mangler</v-app-bar-title>

    <template v-slot:append>
      <v-tooltip text="Cambia tema" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon="mdi-theme-light-dark" @click="toggleTheme" />
        </template>
      </v-tooltip>
    </template>
  </v-app-bar>
</template>
