<script setup lang="ts">
import { useMenuStore } from '@/stores/menu';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const menuStore = useMenuStore();
const { toggleMenu } = menuStore;

const themeStore = useThemeStore();
const { routeTransition, transitionNames } = storeToRefs(themeStore);
const { toggleTheme, setRouteTransition } = themeStore;

const paletteMenuOpen = ref(false);
const primaryColour = ref('');
</script>

<template>
  <v-app-bar color="primary">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="toggleMenu"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Lifeware Java Mangler</v-app-bar-title>

    <template v-slot:append>
      <v-menu v-model="paletteMenuOpen" location="start bottom" open-on-hover :close-on-content-click="false" class="rounded-pill">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="{ ...props, }" icon="mdi-format-color-fill" />
        </template>
        <v-color-picker class="mt-4" style="overflow-x: hidden" v-model="primaryColour" elevation="15" />
      </v-menu>

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
  </v-app-bar>
</template>
