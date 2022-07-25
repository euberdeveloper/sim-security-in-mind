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
      icon: "mdi-bed",
      text: "Mangle class identifier",
      path: "/mangle-class-identifier",
    },
    {
      icon: "mdi-bed",
      text: "Mangle class method",
      path: "/mangle-class-method",
    },
    {
      icon: "mdi-bed",
      text: "Mangle class constructor",
      path: "/mangle-class-constructor",
    },
    {
      icon: "mdi-bed",
      text: "Mangle type",
      path: "/mangle-type",
    },
  ];
}
</script>