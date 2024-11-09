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
    fileInput.value.value = '';
    fileInput.value.click();
  }
}
</script>

<template>
  <input
    ref="fileInput"
    type="file"
    :multiple="multiple"
    :accept="accept"
    @change="onFileChange($event as InputEvent)"
    hidden
  />
  <slot name="activator" :text="text" :activate="chooseFiles">
    <button @click="chooseFiles">{{ text }}</button>
  </slot>
</template>
