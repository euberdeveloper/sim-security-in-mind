<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <v-container class="fill-height" fluid >
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10">
        <v-fade-transition hide-on-leave>

          <v-card :key="title">
            <v-toolbar color="primary" dark>
              <v-toolbar-title>{{ title }}</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <slot></slot>
          </v-card>

        </v-fade-transition>
      </v-col>
    </v-row>
  </v-container>
</template>
