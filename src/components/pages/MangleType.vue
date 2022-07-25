<template>
  <section-card title="Mangle type">
    <v-card-text class="mt-4 mx-2">
      <v-text-field v-model="type" type="text" label="Type" outlined dense />
      <v-text-field :value="mangledType" type="text" label="Mangled" outlined dense readonly append-icon="mdi-content-copy" @click:append="copyText(mangledType)" />
    </v-card-text>
  </section-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mangleType } from "lifeware-java-mangler";
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

  /* GETTERS */

  get mangledType(): string {
    return mangleType(this.type);
  }

  /* METHODS */

  copyText(text: string): void {
    clipboardCopy(text);
  }
}
</script>