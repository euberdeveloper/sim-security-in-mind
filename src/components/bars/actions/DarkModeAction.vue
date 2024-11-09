<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
const { toggleDarkMode } = useThemeStore();
</script>

<template>
  <v-tooltip :text="$t('preferences.barButtons.darkMode')" location="bottom">
    <template #activator="{ props }">
      <v-btn v-bind="props" icon="mdi-theme-light-dark" @click="toggleDarkMode" />
    </template>
  </v-tooltip>
</template>
