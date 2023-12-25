<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue';
import { mangleType, validateType } from 'lifeware-java-mangler';
import { storeToRefs } from 'pinia';

import { useClipboard } from '@/compositions/clipboard';
import { useManglersStore } from '@/stores/manglers';

const { copyToClipboard } = useClipboard();
const { type } = storeToRefs(useManglersStore());
const fallbackMangledType = ref<string | null>(null);

const validType = computed<boolean>(() => {
  return validateType(type.value);
});
const mangledType = computed<string | null>(() => {
  return validType.value ? mangleType(type.value) : null;
});
const mangledTypeShown = computed<string | null>(() => {
  return mangledType.value ?? fallbackMangledType.value;
});

function validationRule() {
  return validType.value;
}

watchEffect(() => {
  if (mangledType.value) {
    fallbackMangledType.value = mangledType.value;
  }
});
</script>

<template>
  <v-card-text class="mt-4 mx-2">
    <v-text-field
      v-model="type"
      type="text"
      label="Type"
      variant="outlined"
      density="compact"
      :rules="[validationRule]"
    />
    <v-text-field
      :value="mangledTypeShown"
      type="text"
      label="Mangled type"
      variant="outlined"
      density="compact"
      readonly
      persistent-placeholder
      append-inner-icon="mdi-content-copy"
      @click:append-inner="copyToClipboard(mangledTypeShown)"
      v-if="mangledTypeShown"
    />
  </v-card-text>
</template>
