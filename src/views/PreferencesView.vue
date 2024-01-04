<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useThemeStore, exportPreferences, importPreferences } from '@/stores/theme';
import { useLanguageStore } from '@/stores/language';

import BtnFileInput from '@/components/gears/BtnFileInput.vue';

const themeStore = useThemeStore();
const {
  isDark,
  themeColors,
  routeTransition,
  transitionSelectItems,
  barButtonNames,
  shownBarButtons,
  languages
} = storeToRefs(themeStore);
const { resetCurrentTheme, resetShownBarButtons } = themeStore;

const languageStore = useLanguageStore();
const { language } = languageStore;
</script>

<template>
  <v-container>
    <v-row>
      <v-col :cols="12">
        <h3>{{ $t('preferences.barButtons.darkMode') }}</h3>
      </v-col>
      <v-col>
        <v-switch
          v-model="isDark"
          :label="$t('preferences.barButtons.darkMode')"
          color="secondary"
          hide-details
          inset
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="12">
        <h3>{{ $t('preferences.colorPalette.title') }}</h3>
      </v-col>
      <v-col :md="3" :cols="6">
        <v-text-field
          v-model="themeColors.primary"
          type="color"
          :label="$t('preferences.colorPalette.primary')"
        />
      </v-col>
      <v-col :md="3" :cols="6">
        <v-text-field
          v-model="themeColors.secondary"
          type="color"
          :label="$t('preferences.colorPalette.secondary')"
        />
      </v-col>
      <v-col :md="3" :cols="6">
        <v-text-field
          v-model="themeColors.success"
          type="color"
          :label="$t('preferences.colorPalette.success')"
        />
      </v-col>
      <v-col :md="3" :cols="6">
        <v-text-field
          v-model="themeColors.info"
          type="color"
          :label="$t('preferences.colorPalette.info')"
        />
      </v-col>
      <v-col :md="3" :cols="6">
        <v-text-field
          v-model="themeColors.warning"
          type="color"
          :label="$t('preferences.colorPalette.warning')"
        />
      </v-col>
      <v-col :md="3" :cols="6">
        <v-text-field
          v-model="themeColors.error"
          type="color"
          :label="$t('preferences.colorPalette.error')"
        />
      </v-col>
      <v-col :md="3" :cols="6">
        <v-text-field
          v-model="themeColors.background"
          type="color"
          :label="$t('preferences.colorPalette.background')"
        />
      </v-col>
      <v-col :md="3" :cols="6">
        <v-text-field
          v-model="themeColors.surface"
          type="color"
          :label="$t('preferences.colorPalette.surface')"
        />
      </v-col>
      <v-col :cols="12">
        <v-btn color="warning" @click="resetCurrentTheme">{{ $t('preferences.reset') }}</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="12">
        <h3>{{ $t('preferences.transitions.title') }}</h3>
      </v-col>
      <v-col>
        <v-select
          v-model="routeTransition"
          :items="transitionSelectItems"
          item-title="title"
          item-value="value"
          :label="$t('preferences.barButtons.routeTransition')"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="12">
        <h3>{{ $t('preferences.barButtons.title') }}</h3>
      </v-col>
      <v-col v-for="(name, value) in barButtonNames" :key="value" :cols="6" :md="4" :lg="3">
        <v-switch
          v-model="shownBarButtons"
          :label="name"
          :value="value"
          color="secondary"
          hide-details
          inset
        />
      </v-col>
      <v-col :cols="12">
        <v-btn color="warning" @click="resetShownBarButtons">{{ $t('preferences.reset') }}</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="12">
        <h3>{{ $t('preferences.barButtons.language') }}</h3>
      </v-col>
      <v-col>
        <v-select
          v-model="language"
          :items="languages"
          item-title="label"
          item-value="name"
          :label="$t('preferences.barButtons.language')"
        >
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" :prepend-icon="`fi:${item.raw.icon}`" :title="item.title" />
          </template>
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="12">
        <h3>{{ $t('preferences.importExport.title') }}</h3>
      </v-col>
      <v-col>
        <BtnFileInput accept=".json" @selected="importPreferences">
          <template #activator="{ activate }">
            <v-btn class="ml-0 mx-2" color="secondary" @click="activate">{{
              $t('preferences.importExport.import')
            }}</v-btn>
          </template>
        </BtnFileInput>
        <v-btn class="ml-0 mx-2" color="secondary" @click="exportPreferences">{{
          $t('preferences.importExport.export')
        }}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
