<script setup lang="ts">
import { computed,ref, type ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';

import BaseMenu, { type MenuItem } from '@/components/gears/BaseMenu.vue';

interface DynamicMenuItem extends Pick<MenuItem, 'icon' | 'path'> {
  text: ComputedRef<string>;
}

const { t, locale } = useI18n({ useScope: 'global' });

const menuItems = ref<DynamicMenuItem[]>(
  [
  {
    icon: 'mdi-alpha-i-circle',
    text: computed(() => t('menu.pages.mangle-class-identifier')),
    path: 'mangle-class-identifier'
  },
  {
    icon: 'mdi-alpha-m-circle',
    text:  computed(() => t('menu.pages.mangle-class-method')),
    path: 'mangle-class-method'
  },
  {
    icon: 'mdi-alpha-c-circle',
    text:  computed(() => t('menu.pages.mangle-class-constructor')),
    path: 'mangle-class-constructor'
  },
  {
    icon: 'mdi-alpha-t-circle',
    text: computed(() =>  t('menu.pages.mangle-type')),
    path: 'mangle-type'
  }
]);
const width = computed(() => locale.value === 'it' ? 300 : 256);
</script>

<template>
  <BaseMenu :width="width" :items="menuItems" />
</template>
