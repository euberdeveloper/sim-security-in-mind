<template>
  <v-app id="app">
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Lifeware Java Mangler</v-toolbar-title>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {
}
</script>


<style lang="scss">
html {
  overflow-y: auto;
}
</style>

