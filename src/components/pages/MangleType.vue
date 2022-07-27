<template>
  <section-card title="Mangle type">
    <v-card-text class="mt-4 mx-2">
      <v-text-field v-model="type" type="text" label="Type" outlined dense :rules="[validationRule]" />
      <v-text-field
        :value="mangledTypeShown"
        type="text"
        label="Mangled type"
        outlined
        dense
        readonly
        append-icon="mdi-content-copy"
        @click:append="copyText(mangledType)"
        v-if="mangledTypeShown"
      />
    </v-card-text>
  </section-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mangleType, validateType } from "lifeware-java-mangler";
import clipboardCopy from "clipboard-copy";

import SectionCard from "@/components/gears/SectionCard.vue";

@Component({
  components: {
    SectionCard,
  },
})
export default class MangleType extends Vue {
  /* DATA */

  private type = "";
  private fallbackMangledType: string | null = null;

  /* GETTERS AND SETTER */

  get validType(): boolean {
    return validateType(this.type);
  }

  get mangledType(): string | null {
    return this.validType ? mangleType(this.type) : null;
  }

  get mangledTypeShown(): string | null {
    return this.mangledType ?? this.fallbackMangledType;
  }

  /* METHODS */

  copyText(text: string): void {
    clipboardCopy(text);
  }

  validationRule() {
    return this.validType;
  }

  /* WATCHERS */

  @Watch("mangledType")
  watchMangledType(): void {
    if (this.mangledType) {
      this.fallbackMangledType = this.mangledType;
    }
  }
}
</script>