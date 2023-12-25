<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useMenuStore } from '@/stores/menu';

import AppVersion from '@/components/gears/AppVersion.vue';

export interface MenuItem {
  icon: string;
  text: string;
  path: string;
}

const menuStore = useMenuStore();
const { showMenu } = storeToRefs(menuStore);

const search = ref('');

const { items } = defineProps<{
  items: MenuItem[];
}>();

const shownItems = computed<MenuItem[]>(() => {
  return search.value
    ? items.filter((item) => item.text.toUpperCase().indexOf(search.value.toUpperCase()) !== -1)
    : items;
});
</script>

<template>
  <v-navigation-drawer v-model="showMenu">
    <v-text-field
      class="mx-2 my-5"
      type="text"
      filled
      rounded
      density="compact"
      hide-details
      variant="outlined"
      label="Cerca"
      name="search"
      v-model="search"
      clearable
    />
    <v-divider />
    <v-list>
      <v-list-item
        v-for="{ path, icon, text } of shownItems"
        :key="path"
        :title="text"
        :to="path"
        rounded="xl"
        :prepend-icon="icon"
      />
    </v-list>
    <v-divider />
    <AppVersion class="mt-4" />
  </v-navigation-drawer>
</template>
