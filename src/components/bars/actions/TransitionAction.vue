<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();
const { routeTransition, transitionNames } = storeToRefs(themeStore);
const { setRouteTransition } = themeStore;
</script>

<template>
    <v-menu>
        <template v-slot:activator="{ props: menuProps }">
          <v-tooltip text="Transizioni" location="bottom">
            <template v-slot:activator="{ props: tooltipProps }">
              <v-btn v-bind="{ ...menuProps, ...tooltipProps }" icon="mdi-transition" />
            </template>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-item v-for="(name, transition) in transitionNames" :key="transition"
            @click="setRouteTransition(transition)">
            <v-list-item-title :class="{ 'font-weight-bold': routeTransition === transition }">{{
              name
              }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
</template>