<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useMenuStore } from '@/stores/menu';

const menuStore = useMenuStore();
const { infoText, showInfoButton, showInfo } = storeToRefs(menuStore);
</script>

<template>
  <v-dialog v-model="showInfo" :width="650" scrollable>
    <template v-slot:activator="{ props: dialogProps }">
      <v-tooltip text="Info pagina" location="bottom" v-if="showInfoButton">
        <template v-slot:activator="{ props: tooltipProps }">
          <v-btn v-bind="{...tooltipProps, ...dialogProps}" icon="mdi-information-outline" />
        </template>
      </v-tooltip>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title class="text-center font-weight-bold">Informazioni</v-toolbar-title>
        </v-toolbar>

        <v-card-text class="info-text">
          <slot>
            <!-- <vue-markdown class="content">{{ infoText }}</vue-markdown> -->
            <span class="content">{{ infoText }}</span>
          </slot>
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