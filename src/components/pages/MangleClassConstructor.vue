<template>
  <section-card title="Mangle class constructor">
    <v-card-text class="mt-4 mx-2">
      <v-text-field v-model="classConstructorSignature" type="text" label="Class constructor" outlined dense />
      <v-text-field
        :value="mangledClassSignature"
        type="text"
        label="Mangled signature"
        outlined
        dense
        readonly
        append-icon="mdi-content-copy"
        @click:append="copyText(mangledClassSignature)"
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
import { mangleConstructorDefinition, mangleConstructorSignature } from "lifeware-java-mangler";
import clipboardCopy from "clipboard-copy";

import SectionCard from "@/components/gears/SectionCard.vue";

@Component({
  components: {
    SectionCard,
  },
})
export default class MangleClassConstructor extends Vue {
  /* DATA */

  private classConstructorSignature = "";

  /* GETTERS */

  get mangledClassSignature(): string {
    try {
      return mangleConstructorSignature(this.classConstructorSignature);
    } catch (error) {
      return "";
    }
  }

  get mangledClassDefinition(): string {
    try {
      return mangleConstructorDefinition(this.classConstructorSignature);
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