<template>
  <section-card title="Mangle class constructor">
    <v-card-text class="mt-4 mx-2">
      <v-text-field v-model="classConstructor" type="text" label="Class constructor" outlined dense />
      <v-text-field
        :value="mangledClassConstructor"
        type="text"
        label="Mangled"
        outlined
        dense
        readonly
        append-icon="mdi-content-copy"
        @click:append="copyText(mangledClassConstructor)"
      />
    </v-card-text>
  </section-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mangleConstructor } from "lifeware-java-mangler";
import clipboardCopy from "clipboard-copy";

import SectionCard from "@/components/gears/SectionCard.vue";

@Component({
  components: {
    SectionCard,
  },
})
export default class MangleClassConstructor extends Vue {
  /* DATA */

  private classConstructor = "";

  /* GETTERS */

  get mangledClassConstructor(): string {
    try {
      return mangleConstructor(this.classConstructor);
    } catch (error) {
      return "";
    }
  }

  /* METHODS */

  copyText(text: string): void {
    clipboardCopy(text);
  }
}
</script>