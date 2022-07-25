<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card class="tile">
          <v-card-title>Titolo</v-card-title>
          <v-card-text>Ciao {{mangledClass}}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue  } from "vue-property-decorator";
import { mangleClassName } from 'lifeware-java-mangler';


@Component({
  components: {
  },
})
export default class Home extends Vue {
  /* DATA */
  private class = 'java.lang.String';

  /* GETTERS */

  get mangledClass() {
    return mangleClassName(this.class);
  }
}
</script>