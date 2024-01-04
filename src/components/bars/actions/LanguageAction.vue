<script setup lang="ts">
import { ref } from 'vue';

const languages = ref([{ icon: 'gb', label: 'English' }, { icon: 'it', label: 'Italian' }]);
const currentLanguage = ref('gb');

function setLanguage(language: string) {
  currentLanguage.value = language;
}
</script>

<template>
  <v-menu>
    <template #activator="{ props: menuProps }">
      <v-tooltip text="Language" location="bottom">
        <template #activator="{ props: tooltipProps }">
          <v-btn v-bind="{ ...menuProps, ...tooltipProps }" icon="mdi-web" />
        </template>
      </v-tooltip>
    </template>
    <v-list>
      <v-list-item v-for="{icon, label} of languages" :key="icon" @click="setLanguage(icon)">
        <v-list-item-title :class="{ 'font-weight-bold': currentLanguage === icon }">
          <v-icon class="rounded-lg" :icon="`fi:${icon}`" />
          <span class="ml-3">{{ label }}</span></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
