<template>
  <v-row dense class="flex-nowrap" style="overflow-x: scroll;">
    <v-col
      v-for="menu in menus"
      :key="menu.id"
      cols="6"
      sm="3"
      lg="2"
    >
      <v-card
        flat
        rounded="0"
        color="brown2"
        @click="onClickMenu(menu)"
      >
        <v-img
          class="align-end text-white"
          position="center center"
          height="120"
          :src="menu.url || menu.ogp?.image || defaultImage"
          cover
        >
          <v-card-title
            class="py-0 px-1 font-weight-bold text-body-2"
            style="background: rgb(var(--v-theme-brown1)); opacity: 0.8;"
          >
            {{ menu.name }}
          </v-card-title>
        </v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { MenuTableListStoreType } from "@/composables/menu-tables/use-menu-table-list"
import MenuTableListStoreKey from "@/composables/menu-tables/use-menu-table-list-key"
import { MenuTableStoreType } from "@/composables/menu-tables/use-menu-table"
import MenuTableStoreKey from "@/composables/menu-tables/use-menu-table-key"

const { menusHash } = inject(MenuTableListStoreKey) as MenuTableListStoreType
const { currentMenuTable, selectedMenus, setCurrentMenuTable, setSelectedMenus } = inject(MenuTableStoreKey) as MenuTableStoreType

const defaultImage = ref('/assets/images/pasta.png')

const menus = computed(() => {
  return selectedMenus.value
})

const onClickMenu = (menu: any) => {
  const menus = currentMenuTable.value.menus || []
  const index = menus.indexOf(menu.id)
  menus.splice(index, 1)

  const menuTable = {
    ...currentMenuTable.value,
    menus: menus
  }

  setSelectedMenus({ menus: menus.map((menuID: any) => menusHash.value[menuID]) })
  setCurrentMenuTable({ menuTable: menuTable })
}

onMounted(async () => {
  setSelectedMenus({ menus: currentMenuTable.value.menus.map((menuID: any) => menusHash.value[menuID]) })
})
</script>
