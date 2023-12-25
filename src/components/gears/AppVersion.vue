<script setup lang="ts">
import { ref } from 'vue';
const siteVersion = ref(__APP_VERSION__);
</script>

<template>
    <p class="version">
        <span>Version&nbsp;</span>
        <span class="version-value">{{ siteVersion }}</span>
    </p>
</template>

<style scoped>
.version {
    text-align: center;
}
</style>