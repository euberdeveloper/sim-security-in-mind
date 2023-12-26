<script setup lang="ts">
import { mangleConstructorDefinition, mangleConstructorSignature, validateConstructorSignature } from "lifeware-java-mangler";
import { storeToRefs } from 'pinia';

import { useClipboard } from '@/compositions/clipboard';
import { useMangling, useManglingValidation } from '@/compositions/mangler';
import { useManglersStore } from '@/stores/manglers';

const { copyToClipboard } = useClipboard();
const { classConstructor } = storeToRefs(useManglersStore());
const { isInputValid, mangledValidationRule } = useManglingValidation(classConstructor, validateConstructorSignature);
const { displayedMangled: displayedMangledConstructorSignature } = useMangling(classConstructor, isInputValid, mangleConstructorSignature);
const { displayedMangled: displayedMangledConstructorDefinition } = useMangling(classConstructor, isInputValid, mangleConstructorDefinition);
</script>

<template>
  <v-card-text class="mt-4 mx-2">
    <v-text-field
      v-model="classConstructor"
      type="text"
      label="Class constructor"
      variant="outlined"
      density="compact"
      clearable
      :rules="[mangledValidationRule]"
    />
    <v-text-field
      :value="displayedMangledConstructorSignature"
      type="text"
      label="Mangled signature"
      variant="outlined"
      density="compact"
      readonly
      persistent-placeholder
      append-inner-icon="mdi-content-copy"
      @click:append-inner="copyToClipboard(displayedMangledConstructorSignature)"
      v-if="displayedMangledConstructorSignature"
    />
    <v-textarea
      :model-value="displayedMangledConstructorDefinition"
      type="text"
      label="Mangled definition"
      variant="outlined"
      density="compact"
      readonly
      auto-grow
      persistent-placeholder
      append-inner-icon="mdi-content-copy"
      @click:append-inner="copyToClipboard(displayedMangledConstructorDefinition)"
      v-if="displayedMangledConstructorDefinition"
    />
  </v-card-text>
</template>
