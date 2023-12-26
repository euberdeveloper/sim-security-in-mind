<script setup lang="ts">
import BaseMenu, { type MenuItem } from '@/components/gears/BaseMenu.vue';

const menuItems: MenuItem[] = [
  {
    icon: 'mdi-alpha-i-circle',
    text: 'Mangle class identifier',
    path: 'mangle-class-identifier'
  },
  {
    icon: 'mdi-alpha-m-circle',
    text: 'Mangle method',
    path: 'mangle-class-method'
  },
  {
    icon: 'mdi-alpha-c-circle',
    text: 'Mangle constructor',
    path: 'mangle-class-constructor'
  },
  {
    icon: 'mdi-alpha-t-circle',
    text: 'Mangle type',
    path: 'mangle-type'
  }
];
</script>

<template>
  <BaseMenu :items="menuItems" />
</template>
