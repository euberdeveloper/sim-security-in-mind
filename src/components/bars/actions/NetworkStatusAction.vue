<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { NetworkStatus } from '@/compositions/networkStatus';

const props = defineProps<{
  networkStatus: NetworkStatus;
}>();

const { t } = useI18n({ useScope: 'global' });

const icons: Record<NetworkStatus, string> = {
  offline: 'mdi-wifi-strength-outline',
  online: 'mdi-wifi',
  unknown: 'mdi-wifi-sync'
};
const tooltips: Record<NetworkStatus, string> = {
  offline: t('notifications.networkStatus.status.offline'),
  online: t('notifications.networkStatus.status.online'),
  unknown: t('notifications.networkStatus.status.unknown')
};
const icon = computed(() => icons[props.networkStatus]);
const tooltip = computed(() => tooltips[props.networkStatus]);
</script>

<template>
  <v-tooltip :text="tooltip" location="bottom">
    <template #activator="{ props }">
      <v-btn v-bind="props" :icon="icon" />
    </template>
  </v-tooltip>
</template>
