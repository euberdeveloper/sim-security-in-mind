<script setup lang="ts">
import { ref } from 'vue';

import { useThemeStore } from '@/stores/theme';

const { toggleTheme } = useThemeStore();
const primaryColour = ref('');

const paletteMenuOpen = ref(false);
</script>

<template>
   <v-menu v-model="paletteMenuOpen" location="start bottom" open-on-hover :close-on-content-click="false" class="rounded-pill">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="{ ...props, }" icon="mdi-format-color-fill" />
        </template>
        <v-color-picker class="mt-4" style="overflow-x: hidden" v-model="primaryColour" elevation="15" />
      </v-menu>
</template>