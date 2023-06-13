<template>
  <v-app>
    <v-app-bar
      app
      fixed
      flat
      dense
      color="white"
    >
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>

    <v-footer
      app
      absolute
      color="white"
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
const title = ref('つくらんば');
</script>


<style>
body::-webkit-scrollbar {
  display: none;
}
</style>
