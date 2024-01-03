<script setup lang="ts">
import { ref } from 'vue';

const languages = ref(['en', 'it']);
const currentLanguage = ref('en');

function setLanguage(language: string) {
  currentLanguage.value = language;
}
</script>

<template>
  <v-menu>
    <template #activator="{ props: menuProps }">
      <v-tooltip text="Language" location="bottom">
        <template #activator="{ props: tooltipProps }">
          <v-btn v-bind="{ ...menuProps, ...tooltipProps }" icon="mdi-transition" />
        </template>
      </v-tooltip>
    </template>
    <v-list>
      <v-list-item v-for="(language) of languages" :key="language" @click="setLanguage(language)">
        <v-list-item-title :class="{ 'font-weight-bold': currentLanguage === language }">{{
          language
          }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
