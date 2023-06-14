<template>
  <v-container>
    <MenuTableChangeWeek />
    <MenuTableList />
  </v-container>
</template>

<script setup lang="ts">
import { MenuTableStoreType } from "@/composables/menu-tables/use-menu-table"
import MenuTableStoreKey from "@/composables/menu-tables/use-menu-table-key"

const { currentDate, fetchAllTags, fetchAllMenus, fetchMenuTables, setCurrentMonth, setCurrentWeek, setCurrentMenuTables } = inject(MenuTableStoreKey) as MenuTableStoreType

onMounted(async () => {
  setCurrentMonth()
  setCurrentWeek()
  fetchAllTags()
  fetchAllMenus()
  await fetchMenuTables({ startDate: currentDate.value })
  setCurrentMenuTables()
})
</script>
