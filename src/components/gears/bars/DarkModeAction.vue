<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
const { toggleTheme } = useThemeStore();
</script>

<template>
    <v-tooltip text="Modalità notte" location="bottom">
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon="mdi-theme-light-dark" @click="toggleTheme" />
        </template>
    </v-tooltip>
</template>