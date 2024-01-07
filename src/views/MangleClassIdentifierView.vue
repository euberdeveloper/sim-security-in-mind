<script setup lang="ts">
import {
  mangleClassDefinition,
  mangleClassIdentifier,
  validateClassIdentifier
} from 'lifeware-java-mangler';
import { storeToRefs } from 'pinia';

import { useClipboard } from '@/compositions/clipboard';
import { useMangling, useManglingValidation } from '@/compositions/mangler';
import { useManglersStore } from '@/stores/manglers';

const { copyToClipboard } = useClipboard();
const { classIdentifier } = storeToRefs(useManglersStore());
const { isInputValid, mangledValidationRule } = useManglingValidation(
  classIdentifier,
  validateClassIdentifier
);
const { displayedMangled: displayedMangledClassIdentifier } = useMangling(
  classIdentifier,
  isInputValid,
  mangleClassIdentifier
);
const { displayedMangled: displayedMangledClassDefinition } = useMangling(
  classIdentifier,
  isInputValid,
  mangleClassDefinition
);
</script>

<template>
  <v-card-text class="mt-4 mx-2">
    <v-text-field
      v-model="classIdentifier"
      type="text"
      :label="$t('views.mangle-class-identifier.class-identifier')"
      variant="outlined"
      density="compact"
      clearable
      :rules="[mangledValidationRule]"
    />
    <v-text-field
      :value="displayedMangledClassIdentifier"
      type="text"
      :label="$t('views.mangle-class-identifier.mangled-identifier')"
      variant="outlined"
      density="compact"
      readonly
      persistent-placeholder
      append-inner-icon="mdi-content-copy"
      @click:append-inner="copyToClipboard(displayedMangledClassIdentifier)"
      v-if="displayedMangledClassIdentifier"
    />
    <v-textarea
      :model-value="displayedMangledClassDefinition"
      type="text"
      :label="$t('views.mangle-class-identifier.mangled-definition')"
      variant="outlined"
      density="compact"
      readonly
      auto-grow
      persistent-placeholder
      append-inner-icon="mdi-content-copy"
      @click:append-inner="copyToClipboard(displayedMangledClassDefinition)"
      v-if="displayedMangledClassDefinition"
    />
  </v-card-text>
</template>
