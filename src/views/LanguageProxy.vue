<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { syncInfoQueryParam } from '@/stores/pageInfo';
import { handlePageTitle } from '@/compositions/pageTitle';

import CardLayout from '@/components/layouts/CardLayout.vue';

const route = useRoute();
const routeId = computed(() => {
  return (route.name as string) ?? '';
});
const routeMetaTitle = computed(() => {
  return route.meta.title;
});
const pageTitle = handlePageTitle(routeMetaTitle);

syncInfoQueryParam();
</script>

<template>
  <CardLayout :id="routeId" :title="pageTitle">
    <router-view />
  </CardLayout>
</template>
