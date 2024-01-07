<script setup lang="ts">
import { syncInfoQueryParam } from '@/stores/pageInfo';

syncInfoQueryParam();
</script>

<template>
  <router-view />
</template>
