<script setup lang="ts">
import { mangleType, validateType } from 'lifeware-java-mangler';
import { storeToRefs } from 'pinia';

import { useClipboard } from '@/compositions/clipboard';
import { useMangling } from '@/compositions/mangler';
import { useManglersStore } from '@/stores/manglers';

const { copyToClipboard } = useClipboard();
const { type } = storeToRefs(useManglersStore());
const { displayedMangled, mangledValidationRule } = useMangling(type, validateType, mangleType);
</script>

<template>
  <v-card-text class="mt-4 mx-2">
    <v-text-field
      v-model="type"
      type="text"
      label="Type"
      variant="outlined"
      density="compact"
      :rules="[mangledValidationRule]"
    />
    <v-text-field
      :value="displayedMangled"
      type="text"
      label="Mangled type"
      variant="outlined"
      density="compact"
      readonly
      persistent-placeholder
      append-inner-icon="mdi-content-copy"
      @click:append-inner="copyToClipboard(displayedMangled)"
      v-if="displayedMangled"
    />
  </v-card-text>
</template>
