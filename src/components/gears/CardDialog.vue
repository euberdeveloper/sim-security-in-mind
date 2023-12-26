<script setup lang="ts">
defineProps<{
  width: number;
  title: string;
}>();
</script>

<template>
  <v-dialog :width="650" scrollable>
    <template v-slot:activator="{ props }">
      <slot name="activator" v-bind="{ props }"></slot>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title class="text-center font-weight-bold">{{ title }}</v-toolbar-title>
        </v-toolbar>

        <v-card-text class="card-text">
          <slot></slot>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="pa-3">
          <v-spacer></v-spacer>
          <v-btn color="success" variant="outlined" @click="isActive.value = false">CHIUDI</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
.card-text {
  text-align: justify;
  font-size: 16px;
  margin: 30px 0;
}
</style>
