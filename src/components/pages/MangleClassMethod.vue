<template>
  <section-card title="Mangle class method">
    <v-card-text class="mt-4 mx-2">
      <v-text-field v-model="classMethodSignature" type="text" label="Class method" outlined dense />
      <v-text-field
        :value="mangledClassMethodSignature"
        type="text"
        label="Mangled signature"
        outlined
        dense
        readonly
        append-icon="mdi-content-copy"
        @click:append="copyText(mangledClassMethodSignature)"
      />
      <v-textarea
        :value="mangledClassMethodDefinition"
        type="text"
        label="Mangled definition"
        outlined
        dense
        readonly
        append-icon="mdi-content-copy"
        @click:append="copyText(mangledClassMethodDefinition)"
      />
    </v-card-text>
  </section-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mangleMethodSignature, mangleMethodDefinition } from "lifeware-java-mangler";
import clipboardCopy from "clipboard-copy";

import SectionCard from "@/components/gears/SectionCard.vue";

@Component({
  components: {
    SectionCard,
  },
})
export default class MangleClassMethod extends Vue {
  /* DATA */

  private classMethodSignature = "";

  /* GETTERS */

  get mangledClassMethodSignature(): string {
    try {
      return mangleMethodSignature(this.classMethodSignature);
    } catch (error) {
      return "";
    }
  }

  get mangledClassMethodDefinition(): string {
    try {
      return mangleMethodDefinition(this.classMethodSignature);
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