<template>
  <section-card title="Mangle class identifier">
    <v-card-text class="mt-4 mx-2">
      <v-text-field v-model="classIdentifier" type="text" label="Class identifier" outlined dense />
      <v-text-field
        :value="mangledClassIdentifier"
        type="text"
        label="Mangled identifier"
        outlined
        dense
        readonly
        append-icon="mdi-content-copy"
        @click:append="copyText(mangledClassIdentifier)"
      />
      <v-textarea
        :value="mangledClassDefinition"
        type="text"
        label="Mangled definition"
        outlined
        dense
        readonly
        append-icon="mdi-content-copy"
        @click:append="copyText(mangledClassDefinition)"
      />
    </v-card-text>
  </section-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mangleClassDefinition, mangleClassIdentifier } from "lifeware-java-mangler";
import clipboardCopy from "clipboard-copy";

import SectionCard from "@/components/gears/SectionCard.vue";

@Component({
  components: {
    SectionCard,
  },
})
export default class MangleClassIdentifier extends Vue {
  /* DATA */

  private classIdentifier = "";

  /* GETTERS */

  get mangledClassIdentifier(): string {
    return mangleClassIdentifier(this.classIdentifier);
  }

  get mangledClassDefinition(): string {
    return mangleClassDefinition(this.classIdentifier);
  }

  /* METHODS */

  copyText(text: string): void {
    clipboardCopy(text);
  }
}
</script>