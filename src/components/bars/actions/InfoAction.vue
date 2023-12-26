<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useMenuStore } from '@/stores/menu';

const menuStore = useMenuStore();
const { showInfoButton, showInfo } = storeToRefs(menuStore);
</script>

<template>
  <v-tooltip text="Info pagina" location="bottom" v-if="showInfoButton">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" icon="mdi-information-outline" @click="showInfo = true" />
    </template>
  </v-tooltip>
</template>