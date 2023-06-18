<template>
  <v-container>
    <MenuListAction />

    <v-divider class="my-1"></v-divider>

    <MenuListSearch />

    <v-divider class="my-1"></v-divider>

    <MenuList class="mt-3"/>
  </v-container>
</template>

<script setup lang="ts">
import { MenuTableListStoreType } from "@/composables/menu-tables/use-menu-table-list"
import MenuTableListStoreKey from "@/composables/menu-tables/use-menu-table-list-key"
import { MenuListStoreType } from "@/composables/menus/use-menu-list"
import MenuListStoreKey from "@/composables/menus/use-menu-list-key"

const { allMenus, fetchAllTags, fetchAllMenus } = inject(MenuTableListStoreKey) as MenuTableListStoreType
const { setFilteredMenus } = inject(MenuListStoreKey) as MenuListStoreType

onMounted(async () => {
  fetchAllTags()
  await fetchAllMenus()
  setFilteredMenus({ menus: allMenus.value })
})
</script>
