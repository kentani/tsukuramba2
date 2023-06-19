<template>
  <NuxtLayout>
    <ClientOnly fallback-tag="span" fallback="Loading...">
      <NuxtPage />
    </ClientOnly>
  </NuxtLayout>
</template>

<script lang="ts">
import AuthStore from "@/composables/use-auth";
import AuthStoreKey from "@/composables/use-auth-key"
import MenuTableListStore from "@/composables/menu-tables/use-menu-table-list"
import MenuTableListStoreKey from "@/composables/menu-tables/use-menu-table-list-key"
import MenuTableStore from "@/composables/menu-tables/use-menu-table"
import MenuTableStoreKey from "@/composables/menu-tables/use-menu-table-key"
import MenuListStore from "@/composables/menus/use-menu-list"
import MenuListStoreKey from "@/composables/menus/use-menu-list-key"
import MenuStore from "@/composables/menus/use-menu"
import MenuStoreKey from "@/composables/menus/use-menu-key"

export default defineComponent({
  setup(ctx: any) {
    provide(AuthStoreKey, AuthStore(ctx))
    provide(MenuTableListStoreKey, MenuTableListStore(ctx))
    provide(MenuTableStoreKey, MenuTableStore(ctx))
    provide(MenuListStoreKey, MenuListStore(ctx))
    provide(MenuStoreKey, MenuStore(ctx))
  },
})
</script>

<style>
body::-webkit-scrollbar {
  display: none;
}
</style>
