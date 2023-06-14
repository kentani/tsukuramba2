<template>
  <v-container>
    <MenuTable />
  </v-container>
</template>

<script setup lang="ts">
import { MenuTableListStoreType } from "@/composables/menu-tables/use-menu-table-list"
import MenuTableListStoreKey from "@/composables/menu-tables/use-menu-table-list-key"
import { MenuTableStoreType } from "@/composables/menu-tables/use-menu-table"
import MenuTableStoreKey from "@/composables/menu-tables/use-menu-table-key"

const { fetchAllTags, fetchAllMenus } = inject(MenuTableListStoreKey) as MenuTableListStoreType
const { fetchMenuTable } = inject(MenuTableStoreKey) as MenuTableStoreType
const route = useRoute()

onMounted(async () => {
  fetchAllTags()
  fetchAllMenus()
  await fetchMenuTable({ menuTableID: route.query.menuTableID })
})
</script>
