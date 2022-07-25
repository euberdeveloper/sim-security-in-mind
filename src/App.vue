<template>
  <v-app id="app">
    <v-app-bar color="primary" clipped-left dark app>
      <v-app-bar-nav-icon @click.stop="toggleMenu"></v-app-bar-nav-icon>
      <v-toolbar-title>Lifeware Java Mangler</v-toolbar-title>
    </v-app-bar>

    <main-menu />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import MainMenu from '@/components/menus/MainMenu.vue';

@Component({
  components: {
    MainMenu
  }
})
export default class App extends Vue {
  /* METHODS */
  toggleMenu(): void {
    this.$store.dispatch('toggleMenu');
  }
}
</script>


<style lang="scss">
html {
  overflow-y: auto;
}
</style>

