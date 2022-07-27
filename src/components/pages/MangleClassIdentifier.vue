<template>
  <section-card title="Mangle class identifier">
    <v-card-text class="mt-4 mx-2">
      <v-text-field v-model="classIdentifier" type="text" label="Class identifier" outlined dense :rules="[validationRule]" />
      <v-text-field
        :value="mangledClassIdentifierShown"
        type="text"
        label="Mangled identifier"
        outlined
        dense
        readonly
        append-icon="mdi-content-copy"
        @click:append="copyText(mangledClassIdentifierShown)"
        v-if="mangledClassIdentifierShown"
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
import { mangleClassDefinition, mangleClassIdentifier, validateClassIdentifier } from "lifeware-java-mangler";
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
  private fallbackMangledClassIdentifier: string | null = null;
  private fallbackMangledClassDefinition: string | null = null;

  /* GETTERS */

  get validIdentifier(): boolean {
    return validateClassIdentifier(this.classIdentifier);
  }

  get mangledClassIdentifier(): string | null {
    return this.validIdentifier ? mangleClassIdentifier(this.classIdentifier) : null;
  }

  get mangledClassDefinition(): string | null {
    return this.validIdentifier ? mangleClassDefinition(this.classIdentifier) : null;
  }

  get mangledClassIdentifierShown(): string | null {
    return this.mangledClassIdentifier ?? this.fallbackMangledClassIdentifier;
  }

  get mangledClassDefinitionShown(): string | null {
    return this.mangledClassDefinition ?? this.fallbackMangledClassDefinition;
  }

  /* METHODS */

  copyText(text: string): void {
    clipboardCopy(text);
  }

  validationRule() {
    return this.validIdentifier;
  }

  /* WATCHERS */

  @Watch("mangledClassIdentifier")
  watchMangledType(): void {
    if (this.mangledClassIdentifier) {
      this.fallbackMangledClassIdentifier = this.mangledClassIdentifier;
    }
  }

  @Watch("mangledClassDefinition")
  watchMangledDefinition(): void {
    if (this.mangledClassDefinition) {
      this.fallbackMangledClassDefinition = this.mangledClassDefinition;
    }
  }
}
</script>