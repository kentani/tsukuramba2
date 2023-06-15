<template>
  <v-container>
    <MenuAction />

    <v-divider class="my-1"></v-divider>

    <MenuSearch />

    <v-divider class="my-1"></v-divider>

    <MenuList class="mt-3"/>
  </v-container>
</template>

<script setup lang="ts">
import { MenuTableListStoreType } from "@/composables/menu-tables/use-menu-table-list"
import MenuTableListStoreKey from "@/composables/menu-tables/use-menu-table-list-key"

const { fetchAllTags, fetchAllMenus } = inject(MenuTableListStoreKey) as MenuTableListStoreType

onMounted(async () => {
  fetchAllTags()
  fetchAllMenus()
})
</script>
