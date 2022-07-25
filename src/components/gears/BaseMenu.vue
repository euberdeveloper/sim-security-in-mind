<template>
  <v-navigation-drawer v-model="showMenu" :clipped="$vuetify.breakpoint.lgAndUp" app>
    <v-text-field class="mx-2 my-5" type="text" filled rounded dense hide-details outlined label="Cerca" name="search" v-model="search" clearable  />
    <v-divider />
    <v-list shaped>
      <v-list-item-group v-model="tab">
        <v-list-item v-for="item of shownItems" :key="item.path" :to="item.path">
          <v-list-item-icon class="mr-3">
            <v-icon dense>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-divider />
    <p class="version">
      <span>Version</span>
      <span class="version-value"> {{ siteVersion }}</span>
    </p>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import CONFIG from "@/config";

export interface MenuItem {
  icon: string;
  text: string;
  path: string;
}

@Component
export default class BaseMenu extends Vue {
  /* PROPS */

  @Prop({ type: Array, required: true })
  private items!: MenuItem[];

  /* DATA */

  private tab = 0;
  private search = "";
  private siteVersion = CONFIG.VERSION;

  /* COMPUTED */

  get showMenu(): boolean {
    return this.$store.state.showMenu;
  }
  set showMenu(value: boolean) {
    this.$store.commit('setShowMenu', value);
  }

  get shownItems(): MenuItem[] {
    return this.search ? this.items.filter((item) => item.text.toUpperCase().indexOf(this.search.toUpperCase()) !== -1) : this.items;
  }
}
</script>

<style lang="scss" scoped>
.version {
  margin-top: 1em;
  text-align: center;
}
</style>