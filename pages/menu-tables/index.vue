<template>
  <v-container>
    <MenuTableChangeWeek />
    <MenuTableList />
  </v-container>
</template>

<script setup lang="ts">
import { MenuTableListStoreType } from "@/composables/menu-tables/use-menu-table-list"
import MenuTableListStoreKey from "@/composables/menu-tables/use-menu-table-list-key"
import { MenuTableStoreType } from "@/composables/menu-tables/use-menu-table"
import MenuTableStoreKey from "@/composables/menu-tables/use-menu-table-key"

const {
  currentDate,
  fetchAllTags,
  fetchAllMenus,
  fetchMenuTables,
  setCurrentMonth,
  setCurrentWeek,
  setCurrentMenuTables
} = inject(MenuTableListStoreKey) as MenuTableListStoreType

const { resetCurrentMenuTable } = inject(MenuTableStoreKey) as MenuTableStoreType

onMounted(async () => {
  resetCurrentMenuTable()
  setCurrentMonth()
  setCurrentWeek()
  fetchAllTags()
  fetchAllMenus()
  await fetchMenuTables({ startDate: currentDate.value })
  setCurrentMenuTables()
})
</script>
