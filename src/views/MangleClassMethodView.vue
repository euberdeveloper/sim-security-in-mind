<template>
  <v-fade-transition hide-on-leave>
    <v-main :key="$route.fullPath">
      <v-container fluid fill-height>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="10">
            <mangle-class-method />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-fade-transition>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MangleClassMethod from "@/components/pages/MangleClassMethod.vue";

@Component({
  components: {
    MangleClassMethod,
  },
})
export default class MangleClassMethodView extends Vue {}
</script>