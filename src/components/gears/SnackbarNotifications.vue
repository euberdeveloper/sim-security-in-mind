<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useNotificationsStore } from '@/stores/notifications';

const { showSnackbar, snackbarText, snackbarColor } = storeToRefs(useNotificationsStore());
</script>

<template>
	<v-snackbar :color="snackbarColor" v-model="showSnackbar">
		{{ snackbarText }}
		<template v-slot:actions>
			<v-btn variant="text" @click="showSnackbar = false">Close</v-btn>
		</template>
	</v-snackbar>
</template>
