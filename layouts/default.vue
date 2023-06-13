<template>
  <v-app :style="{ background: '#EFEBE9' }">
    <v-app-bar
      app
      fixed
      flat
      density="compact"
      color="brown1"
    >
      <v-toolbar-title class="mx-0">
        <v-row
          no-gutters
            class="px-2"
        >
          <v-col
            cols="1"
            align="center"
          >
            <v-icon>mdi-chef-hat</v-icon>
          </v-col>

          <v-col
            cols="11"
            align="center"
            class="text-left pt-1 pl-1"
          >
            {{ title }}
          </v-col>
        </v-row>
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
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
