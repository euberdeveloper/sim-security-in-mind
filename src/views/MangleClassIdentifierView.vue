<template>
  <v-fade-transition hide-on-leave>
    <v-main :key="$route.fullPath">
      <v-container fluid fill-height>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="10">
            <mangle-class-identifier />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-fade-transition>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MangleClassIdentifier from "@/components/pages/MangleClassIdentifier.vue";

@Component({
  components: {
    MangleClassIdentifier,
  },
})
export default class MangleClassIdentifierView extends Vue {}
</script>