<template>
  <base-menu :items="items" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import BaseMenu, { MenuItem } from "@/components/gears/BaseMenu.vue";

@Component({
  components: {
    BaseMenu,
  },
})
export default class MainMenu extends Vue {
  /* DATA */

  private items: MenuItem[] = [
    {
      icon: "mdi-alpha-i-circle",
      text: "Mangle class identifier",
      path: "/mangle-class-identifier",
    },
    {
      icon: "mdi-alpha-m-circle",
      text: "Mangle method",
      path: "/mangle-class-method",
    },
    {
      icon: "mdi-alpha-c-circle",
      text: "Mangle constructor",
      path: "/mangle-class-constructor",
    },
    {
      icon: "mdi-alpha-t-circle",
      text: "Mangle type",
      path: "/mangle-type",
    },
  ];
}
</script>