<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({ useScope: 'global' });

interface Device{
  macAddress: string;
  privateIP: string;
  modelNaame: string;
}
const devices = ref<Device[]>([]);
const fetching = ref(false);

const headers = ref([
  { title: computed(() => t('views.devices.columns.mac-address')), value: 'macAddress', sortable: true },
  { title: computed(() => t('views.devices.columns.private-ip')), value: 'privateIP', sortable: true },
  { title: computed(() => t('views.devices.columns.model-name')), value: 'modelName', sortable: true },
  { title: computed(() => t('views.devices.columns.actions')), value: 'actions', sortable: false }
]);
const search = ref('');

async function getDevices() {
  return new Promise<Device[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          macAddress: '00:00:00:00:00:00',
          privateIP: '123.123.123.123',
          modelName: 'Model 1'
        },
        {
          macAddress: '00:00:00:00:00:00',
          privateIP: '123.123.123.123',
          modelName: 'Model 1'
        },
        {
          macAddress: '00:00:00:00:00:00',
          privateIP: '123.123.123.123',
          modelName: 'Model 1'
        }
      ]);
    }, 5000);
  });
}
        
async function fetchData() {
  try {
    fetching.value = true;
    devices.value = await getDevices();
  } finally {
    fetching.value = false;
  }
}

fetchData();
</script>

<template>
  <v-card-text class="mt-4 mx-2">
    <v-data-table
      :loading="fetching"
      :headers="headers"
      :items="devices"
      :search="search"
      multi-sort
    >
      <template #top>
        <v-toolbar color="surface" flat>
          <v-container class="pa-0 fill-height fluid d-flex" fluid>
            <v-toolbar-title class="mr-4">{{ t('views.devices.title') }}</v-toolbar-title>
            <v-text-field
              class="flex"
              v-model="search"
              :label="t('views.devices.search')"
              variant="outlined"
              density="compact"
              clearable
              hide-details
              prepend-inner-icon="mdi-magnify"
            />
          </v-container>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon size="small" color="secondary" class="me-2" @click="openView(item)">mdi-eye</v-icon>
      </template>
    </v-data-table>
  </v-card-text>
</template>
