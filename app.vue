<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts">
import AuthStore from "@/composables/use-auth";
import AuthStoreKey from "@/composables/use-auth-key"
import MenuTableListStore from "@/composables/menu-tables/use-menu-table-list"
import MenuTableListStoreKey from "@/composables/menu-tables/use-menu-table-list-key"
import MenuTableStore from "@/composables/menu-tables/use-menu-table"
import MenuTableStoreKey from "@/composables/menu-tables/use-menu-table-key"

export default defineComponent({
  setup(ctx: any) {
    provide(AuthStoreKey, AuthStore(ctx))
    provide(MenuTableListStoreKey, MenuTableListStore(ctx))
    provide(MenuTableStoreKey, MenuTableStore(ctx))
  },
})
</script>

<style>
body::-webkit-scrollbar {
  display: none;
}
</style>
