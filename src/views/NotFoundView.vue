<template>
  <v-container>
    <v-row>
      <v-col :cols="12">
        <h2 class="my-4 text-center">{{ $t('views.not-found.text', { path: $route.path }) }}</h2>
        <img class="my-4 image" src="@/assets/not_found.png" alt="not found" />
      </v-col>
      <v-col class="d-flex justify-center">
        <v-btn color="primary" large to="/">{{ $t('views.not-found.go-back') }}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.image {
  max-width: 100%;
}
</style>
