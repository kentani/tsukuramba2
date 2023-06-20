<template>
  <v-row dense>
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

          <div
            v-if="selectedMenuIds.includes(menu.id)"
            class="pa-2 font-weight-bold text-body-2"
            style="background: rgb(var(--v-theme-brown1)); opacity: 0.8; height: 120px;"
          >
            選択済み
          </div>

          <v-card-title
            v-else
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
import { MenuListStoreType } from "@/composables/menus/use-menu-list"
import MenuListStoreKey from "@/composables/menus/use-menu-list-key"

const { menusHash } = inject(MenuTableListStoreKey) as MenuTableListStoreType
const { currentMenuTable, selectedMenus, setCurrentMenuTable, setSelectedMenus } = inject(MenuTableStoreKey) as MenuTableStoreType
const { filteredMenus } = inject(MenuListStoreKey) as MenuListStoreType

const defaultImage = ref('/images/pasta.png')

const menus = computed(() => {
  return filteredMenus.value
})

const selectedMenuIds = computed(() => {
  return selectedMenus.value.map((m: any) => m.id)
})

const onClickMenu = (menu: any) => {
  const menus = currentMenuTable.value.menus

  if(selectedMenuIds.value.includes(menu.id)) {
    const index = menus.indexOf(menu.id)
    menus.splice(index, 1)
  } else {
    menus.push(menu.id)
  }

  const menuTable = {
    ...currentMenuTable.value,
    menus: menus
  }

  setSelectedMenus({ menus: menus.map((menuID: any) => menusHash.value[menuID]) })
  setCurrentMenuTable({ menuTable: menuTable })
}
</script>
