<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';

import { usePageInfoStore } from '@/stores/pageInfo';
import { useThemeStore } from '@/stores/theme';
import type { NetworkStatus } from '@/compositions/networkStatus';

const pageInfoStore = usePageInfoStore();
const { showInfoButton, showInfoDialog } = storeToRefs(pageInfoStore);

const themeStore = useThemeStore();
const { showPageInfo, showNetwork } = storeToRefs(themeStore);

const display = useDisplay();
const isMobile = computed(() => display.mobile.value);

const { t } = useI18n({ useScope: 'global' });

const props = defineProps<{
  networkStatus: NetworkStatus;
}>();

const networkIcons: Record<NetworkStatus, string> = {
  offline: 'mdi-wifi-strength-outline',
  online: 'mdi-wifi',
  unknown: 'mdi-wifi-sync'
};
const networkTooltips: Record<NetworkStatus, string> = {
  offline: t('notifications.networkStatus.status.offline'),
  online: t('notifications.networkStatus.status.online'),
  unknown: t('notifications.networkStatus.status.unknown')
};
const networkIcon = computed(() => networkIcons[props.networkStatus]);
const networkTooltip = computed(() => networkTooltips[props.networkStatus]);
</script>

<template>
  <v-menu :open-on-hover="!isMobile">
    <template #activator="{ props }">
      <v-btn v-bind="props" icon="mdi-dots-vertical" />
    </template>
    <v-list>
      <v-list-item
        :title="$t('preferences.title')"
        prepend-icon="mdi-tune-vertical-variant"
        :to="{ name: 'preferences' }"
      />
      <v-list-item
        :title="$t('preferences.barButtons.pageInfo')"
        prepend-icon="mdi-information-outline"
        @click="showInfoDialog = true"
        v-if="showInfoButton && !showPageInfo"
      />
      <v-tooltip open-on-click :open-on-hover="false" :text="networkTooltip" location="left">
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            :title="$t('preferences.barButtons.networkStatus')"
            :prepend-icon="networkIcon"
            v-if="!showNetwork"
          />
        </template>
      </v-tooltip>
    </v-list>
  </v-menu>
</template>
