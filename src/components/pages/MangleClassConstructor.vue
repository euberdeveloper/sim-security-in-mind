<template>
  <section-card title="Mangle class constructor">
    <v-card-text class="mt-4 mx-2">
      <v-text-field v-model="classConstructorSignature" type="text" label="Class constructor" outlined dense :rules="[validationRule]" />
      <v-text-field
        :value="mangledClassSignatureShown"
        type="text"
        label="Mangled signature"
        outlined
        dense
        readonly
        append-icon="mdi-content-copy"
        @click:append="copyText(mangledClassSignatureShown)"
        v-if="mangledClassSignatureShown"
      />
      <v-textarea
        :value="mangledClassDefinitionShown"
        type="text"
        label="Mangled definition"
        outlined
        dense
        readonly
        append-icon="mdi-content-copy"
        @click:append="copyText(mangledClassDefinitionShown)"
        v-if="mangledClassDefinitionShown"
      />
    </v-card-text>
  </section-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mangleConstructorDefinition, mangleConstructorSignature, validateConstructorSignature } from "lifeware-java-mangler";
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
  private fallbackMangledClassConstructorSignature: string | null = null;
  private fallbackMangledClassConstructorDefinition: string | null = null;

  /* GETTERS */

  get validClassConstructorSignature(): boolean {
    return validateConstructorSignature(this.classConstructorSignature);
  }

  get mangledClassConstructorSignature(): string | null {
    return this.validClassConstructorSignature ? mangleConstructorSignature(this.classConstructorSignature) : null;
  }

  get mangledClassConstructorDefinition(): string | null {
    return this.validClassConstructorSignature ? mangleConstructorDefinition(this.classConstructorSignature) : null;
  }

  get mangledClassSignatureShown(): string | null {
    return this.mangledClassConstructorSignature ?? this.fallbackMangledClassConstructorSignature;
  }

  get mangledClassDefinitionShown(): string | null {
    return this.mangledClassConstructorDefinition ?? this.fallbackMangledClassConstructorDefinition;
  }

  /* METHODS */

  copyText(text: string): void {
    clipboardCopy(text);
  }

  validationRule() {
    return this.validClassConstructorSignature;
  }

  /* WATCHERS */

  @Watch("mangledClassConstructorSignature")
  watchMangledConstructorSignature(): void {
    if (this.mangledClassConstructorSignature) {
      this.fallbackMangledClassConstructorSignature = this.mangledClassConstructorSignature;
    }
  }

  @Watch("mangledClassConstructorDefinition")
  watchMangledConstructorDefinition(): void {
    if (this.mangledClassConstructorDefinition) {
      this.fallbackMangledClassConstructorDefinition = this.mangledClassConstructorDefinition;
    }
  }
}
</script>