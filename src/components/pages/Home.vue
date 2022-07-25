<template>
  <v-container fluid fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" md="10">
        <section-card title="Mangle class"> ciao {{mangledClass}}</section-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mangleClassName } from "lifeware-java-mangler";

import SectionCard from "@/components/gears/SectionCard.vue";

@Component({
  components: {
    SectionCard,
  },
})
export default class Home extends Vue {
  /* DATA */
  private class = "java.lang.String";

  /* GETTERS */

  get mangledClass() {
    return mangleClassName(this.class);
  }
}
</script>