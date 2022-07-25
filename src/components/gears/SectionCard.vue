<template>
  <v-card class="tile">
    <v-toolbar color="primary" dark>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
    </v-toolbar>

    <slot />
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SectionCard extends Vue {
  /* PROPS */

  @Prop({ type: String, required: true })
  title!: string;
}
</script>