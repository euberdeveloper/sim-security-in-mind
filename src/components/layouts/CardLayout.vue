<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';

import { useThemeStore } from '@/stores/theme';
import type { TitleDescriptor } from '@/compositions/pageTitle';

const props = defineProps<{
  title: Required<TitleDescriptor>;
  id: string;
}>();

const { routeTransition } = storeToRefs(useThemeStore());

const { t } = useI18n();
const titleText = computed(() => {
  return t(`routes.${props.title.text}`) ?? '';
});
const titleAlign = computed(() => {
  return `text-${props.title.position}`;
});
const titleTransform = computed(() => {
  return props.title.case ? `text-${props.title.case}` : '';
});
const titleWeight = computed(() => {
  return props.title.bold ? 'font-weight-bold' : '';
});
</script>

<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10">
        <component :is="routeTransition" hide-on-leave>
          <v-card :key="id">
            <v-toolbar color="primary" dark>
              <v-toolbar-title :class="[titleAlign, titleTransform, titleWeight]">{{
                titleText
              }}</v-toolbar-title>
            </v-toolbar>
            <slot></slot>
          </v-card>
        </component>
      </v-col>
    </v-row>
  </v-container>
</template>
