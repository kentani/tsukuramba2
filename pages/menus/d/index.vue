<template>
  <v-container v-show="state.loaded" class="pa-0">
    <Menu />
  </v-container>
</template>

<script setup lang="ts">
import { MenuTableListStoreType } from "@/composables/menu-tables/use-menu-table-list"
import MenuTableListStoreKey from "@/composables/menu-tables/use-menu-table-list-key"
import { MenuStoreType } from "@/composables/menus/use-menu"
import MenuStoreKey from "@/composables/menus/use-menu-key"

const { fetchAllTags } = inject(MenuTableListStoreKey) as MenuTableListStoreType
const { fetchMenu, resetCurrentMenu } = inject(MenuStoreKey) as MenuStoreType

const route = useRoute()

const state = reactive({
  loaded: false,
})

onMounted(async () => {
  fetchAllTags()
  await fetchMenu({ menuID: route.query.menuID })
  state.loaded = true
})

onUnmounted(() => {
  resetCurrentMenu()
})
</script>
