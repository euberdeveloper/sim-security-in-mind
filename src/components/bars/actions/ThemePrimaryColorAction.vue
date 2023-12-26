<script setup lang="ts">
import { ref , computed} from 'vue';
import { storeToRefs } from 'pinia';
import {useDisplay} from 'vuetify';

import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();
const {primaryColor} = storeToRefs(themeStore);
const { randomPrimaryColor } = themeStore;

const display = useDisplay();
const isMobile = computed(() => display.mobile.value );

const paletteMenuOpen = ref(false);
</script>

<template>
  <v-menu v-model="paletteMenuOpen" location="start bottom" :open-on-hover="!isMobile" :close-on-content-click="false"
    class="rounded-pill">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="{ ...props, }" icon="mdi-format-color-fill" @click="!isMobile && randomPrimaryColor()" />
    </template>
    <v-color-picker class="mt-4" style="overflow-x: hidden" v-model="primaryColor" elevation="15" />
  </v-menu>
</template>