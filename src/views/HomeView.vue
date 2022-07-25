<template>
  <home />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Home from "@/components/pages/Home.vue";

@Component({
  components: {
    Home
  },
})
export default class HomeView extends Vue {}
</script>