<script setup lang="ts">
import { mangleType, validateType } from 'lifeware-java-mangler';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';

import { useClipboard } from '@/compositions/clipboard';
import { useMangling, useManglingValidation } from '@/compositions/mangler';
import { syncStringQueryParam } from '@/compositions/syncQueryParam';
import { useManglersStore } from '@/stores/manglers';

const { copyToClipboard } = useClipboard();
const { type } = storeToRefs(useManglersStore());
const { isInputValid, mangledValidationRule } = useManglingValidation(type, validateType);
const { displayedMangled } = useMangling(type, isInputValid, mangleType);

const { updateRouteQuery } = syncStringQueryParam(type, useRouter(), useRoute(), 'mangleType');
updateRouteQuery();
</script>

<template>
  <v-card-text class="mt-4 mx-2">
    <v-text-field
      v-model="type"
      type="text"
      :label="$t('views.mangle-type.type')"
      variant="outlined"
      density="compact"
      clearable
      :rules="[mangledValidationRule]"
    />
    <v-text-field
      :model-value="displayedMangled"
      type="text"
      :label="$t('views.mangle-type.mangled-type')"
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
