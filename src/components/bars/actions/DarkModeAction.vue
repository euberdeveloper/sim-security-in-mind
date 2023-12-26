<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
const { toggleDarkMode } = useThemeStore();
</script>

<template>
  <v-tooltip text="Modalità notte" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" icon="mdi-theme-light-dark" @click="toggleDarkMode" />
    </template>
  </v-tooltip>
</template>
