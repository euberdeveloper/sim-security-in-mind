<script setup lang="ts">
import { computed } from 'vue';
import { useDisplay } from 'vuetify';

const display = useDisplay();
const isMobile = computed(() => display.mobile.value);
</script>

<template>
  <v-menu :open-on-hover="!isMobile">
    <template #activator="{ props }">
      <v-btn v-bind="props" icon="mdi-dots-vertical" />
    </template>
    <v-list>
      <v-list-item title="Preferences" prepend-icon="mdi-tune-vertical-variant" :to="{ name: 'preferences' }" />
    </v-list>
  </v-menu>
</template>
