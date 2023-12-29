<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  text?: string;
  accept?: string;
  multiple?: boolean;
}>();

const emit = defineEmits<{
  (e: 'selected', file: FileList | null): void;
}>();

const fileInput = ref<HTMLInputElement | null>(null);

function onFileChange(e: InputEvent) {
  const files = (e.target as HTMLInputElement).files;
  emit('selected', files);
}

function chooseFiles() {
  if (fileInput.value) {
    fileInput.value.click();
  }
}
</script>

<template>
  <input ref="fileInput" type="file" :multiple="multiple" :accept="accept" @change="onFileChange($event as InputEvent)"
    hidden />
  <v-btn class="ml-0 mx-2" color="secondary" @click="chooseFiles">
    <slot>{{ text }}</slot>
  </v-btn>
</template>
