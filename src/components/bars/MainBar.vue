<script setup lang="ts">
import { useMenuStore } from '@/stores/menu';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';

const menuStore = useMenuStore();
const { toggleMenu } = menuStore;

const themeStore = useThemeStore();
const { routeTransition, transitionNames } = storeToRefs(themeStore);
const { toggleTheme, setRouteTransition } = themeStore;
</script>

<template>
  <v-app-bar color="primary">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="toggleMenu"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Lifeware Java Mangler</v-app-bar-title>

    <template v-slot:append>
      <v-tooltip text="Cambia tema" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon="mdi-theme-light-dark" @click="toggleTheme" />
        </template>
      </v-tooltip>

      <v-menu>
        <template v-slot:activator="{ props: menuProps }">
          <v-tooltip text="Transizioni" location="bottom">
            <template v-slot:activator="{ props: tooltipProps }">
              <v-btn v-bind="{ ...menuProps, ...tooltipProps }" icon="mdi-transition" />
            </template>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-item
            v-for="(name, transition) in transitionNames"
            :key="transition"
            @click="setRouteTransition(transition)"
          >
            <v-list-item-title :class="{ 'font-weight-bold': routeTransition === transition }">{{
              name
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>
