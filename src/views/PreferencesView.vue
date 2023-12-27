<script setup lang="ts">
import {storeToRefs} from 'pinia';
import { useThemeStore } from '@/stores/theme';

const themeStore= useThemeStore();
const { isDark, themeColors, routeTransition, transitionSelectItems, barButtonNames, shownBarButtons } = storeToRefs(themeStore);
const { resetCurrentTheme, resetShownBarButtons } = themeStore;
</script>

<template>
    <v-container>
        <v-row>
            <v-col :cols="12">
                <h3>Dark mode</h3>
            </v-col>
            <v-col>
                <v-switch v-model="isDark" label="Dark mode" color="secondary" hide-details inset />
            </v-col>
        </v-row>
        <v-row>
            <v-col :cols="12">
                <h3>Color palette</h3>
            </v-col>
            <v-col :md="3" :cols="6">
                <v-text-field v-model="themeColors.primary" type="color" label="Primary" />
            </v-col>
            <v-col :md="3" :cols="6">
                <v-text-field v-model="themeColors.secondary" type="color" label="Secondary" />
            </v-col>
            <v-col :md="3" :cols="6">
                <v-text-field v-model="themeColors.success" type="color" label="Success" />
            </v-col>
            <v-col :md="3" :cols="6">
                <v-text-field v-model="themeColors.info" type="color" label="Info" />
            </v-col>
            <v-col :md="3" :cols="6">
                <v-text-field v-model="themeColors.warning" type="color" label="Warning" />
            </v-col>
            <v-col :md="3" :cols="6">
                <v-text-field v-model="themeColors.error" type="color" label="Error" />
            </v-col>
            <v-col :md="3" :cols="6">
                <v-text-field v-model="themeColors.background" type="color" label="Background" />
            </v-col>
            <v-col :md="3" :cols="6">
                <v-text-field v-model="themeColors.surface" type="color" label="Surface" />
            </v-col>
            <v-col>
                <v-btn color="warning" @click="resetCurrentTheme">Reset</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col :cols="12">
                <h3>Transitions</h3>
            </v-col>
            <v-col>
                <v-select v-model="routeTransition" :items="transitionSelectItems" item-title="title" item-value="value"
                    label="Route transition" />
            </v-col>
        </v-row>
        <v-row>
            <v-col :cols="12">
                <h3>Bar buttons</h3>
            </v-col>
            <v-col v-for="(name, value) in barButtonNames" :key="value" :cols="6" :md="4" :lg="3">
                <v-switch v-model="shownBarButtons" :label="name" :value="value" color="secondary" hide-details inset />
            </v-col>
            <v-col>
                <v-btn color="warning" @click="resetShownBarButtons">Reset</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
