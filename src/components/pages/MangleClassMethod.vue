<template>
  <section-card title="Mangle class method">
    <v-card-text class="mt-4 mx-2">
      <v-text-field v-model="classMethodSignature" type="text" label="Class method" outlined dense :rules="[validationRule]" />
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
import { mangleMethodDefinition, mangleMethodSignature, validateMethodSignature } from "lifeware-java-mangler";
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
  private fallbackMangledClassMethodSignature: string | null = null;
  private fallbackMangledClassMethodDefinition: string | null = null;

  /* GETTERS */

  get validClassMethodSignature(): boolean {
    return validateMethodSignature(this.classMethodSignature);
  }

  get mangledClassMethodSignature(): string | null {
    return this.validClassMethodSignature ? mangleMethodSignature(this.classMethodSignature) : null;
  }

  get mangledClassMethodDefinition(): string | null {
    return this.validClassMethodSignature ? mangleMethodDefinition(this.classMethodSignature) : null;
  }

  get mangledClassSignatureShown(): string | null {
    return this.mangledClassMethodSignature ?? this.fallbackMangledClassMethodSignature;
  }

  get mangledClassDefinitionShown(): string | null {
    return this.mangledClassMethodDefinition ?? this.fallbackMangledClassMethodDefinition;
  }

  /* METHODS */

  copyText(text: string): void {
    clipboardCopy(text);
  }

  validationRule() {
    return this.validClassMethodSignature;
  }

  /* WATCHERS */

  @Watch("mangledClassMethodSignature")
  watchMangledMethodSignature(): void {
    if (this.mangledClassMethodSignature) {
      this.fallbackMangledClassMethodSignature = this.mangledClassMethodSignature;
    }
  }

  @Watch("mangledClassMethodDefinition")
  watchMangledMethodDefinition(): void {
    if (this.mangledClassMethodDefinition) {
      this.fallbackMangledClassMethodDefinition = this.mangledClassMethodDefinition;
    }
  }
}
</script>