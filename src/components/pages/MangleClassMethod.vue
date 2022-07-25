<template>
  <section-card title="Mangle class method">
    <v-card-text class="mt-4 mx-2">
      <v-text-field v-model="classMethod" type="text" label="Class method" outlined dense />
      <v-text-field
        :value="mangledClassMethod"
        type="text"
        label="Mangled"
        outlined
        dense
        readonly
        append-icon="mdi-content-copy"
        @click:append="copyText(mangledClassMethod)"
      />
    </v-card-text>
  </section-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mangleMethod } from "lifeware-java-mangler";
import clipboardCopy from "clipboard-copy";

import SectionCard from "@/components/gears/SectionCard.vue";

@Component({
  components: {
    SectionCard,
  },
})
export default class MangleClassMethod extends Vue {
  /* DATA */

  private classMethod = "";

  /* GETTERS */

  get mangledClassMethod(): string {
    try {
      return mangleMethod(this.classMethod);
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