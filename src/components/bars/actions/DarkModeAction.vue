<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
const { toggleDarkMode } = useThemeStore();
</script>

<template>
  <v-tooltip text="Dark mode" location="bottom">
    <template #activator="{ props }">
      <v-btn v-bind="props" icon="mdi-theme-light-dark" @click="toggleDarkMode" />
    </template>
  </v-tooltip>
</template>
