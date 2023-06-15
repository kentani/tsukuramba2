<template>
  <v-container>
    <Menu />
  </v-container>
</template>

<script setup lang="ts">
import { MenuTableListStoreType } from "@/composables/menu-tables/use-menu-table-list"
import MenuTableListStoreKey from "@/composables/menu-tables/use-menu-table-list-key"
import { MenuStoreType } from "@/composables/menus/use-menu"
import MenuStoreKey from "@/composables/menus/use-menu-key"

const { fetchAllTags, tagsHash } = inject(MenuTableListStoreKey) as MenuTableListStoreType
const { fetchMenu } = inject(MenuStoreKey) as MenuStoreType

const route = useRoute()

onMounted(async () => {
  await fetchAllTags()
  await fetchMenu({ menuID: route.query.menuID })
})
</script>
