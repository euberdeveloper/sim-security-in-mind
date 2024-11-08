<script setup lang="ts">
import { computed, ref, type ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';

import BaseMenu, { type MenuItem } from '@/components/gears/BaseMenu.vue';

interface DynamicMenuItem extends Pick<MenuItem, 'icon' | 'path'> {
  text: ComputedRef<string>;
}

const { t, locale } = useI18n({ useScope: 'global' });

const menuItems = ref<DynamicMenuItem[]>([
  {
    icon: 'mdi-alpha-i-circle',
    text: computed(() => t('menu.pages.devices')),
    path: 'devices'
  }
]);
const width = computed(() => (locale.value === 'it' ? 300 : 256));
</script>

<template>
  <BaseMenu :width="width" :items="menuItems" />
</template>
