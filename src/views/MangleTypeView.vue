<template>
  <v-fade-transition hide-on-leave>
    <v-main :key="$route.fullPath">
      <v-container fluid fill-height>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="10">
            <mangle-type />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-fade-transition>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MangleType from "@/components/pages/MangleType.vue";

@Component({
  components: {
    MangleType,
  },
})
export default class MangleTypeView extends Vue {}
</script>