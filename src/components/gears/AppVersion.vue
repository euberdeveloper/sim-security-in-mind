<script setup lang="ts">
import config from '@/config';
import { ref } from 'vue';
const siteVersion = ref(config.appVersion);
</script>

<template>
  <p class="version">
    <span>Version&nbsp;</span>
    <span class="version-value">{{ siteVersion }}</span>
  </p>
</template>

<style scoped>
.version {
  text-align: center;
}
</style>
