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
import { MenuListStoreType } from "@/composables/menus/use-menu-list"
import MenuListStoreKey from "@/composables/menus/use-menu-list-key"
import { MenuStoreType } from "@/composables/menus/use-menu"
import MenuStoreKey from "@/composables/menus/use-menu-key"

const { tagsHash, menusHash } = inject(MenuTableListStoreKey) as MenuTableListStoreType
const { buildMenus } = inject(MenuTableStoreKey) as MenuTableStoreType
const { filteredMenus } = inject(MenuListStoreKey) as MenuListStoreType
const { setCurrentMenu } = inject(MenuStoreKey) as MenuStoreType

const router = useRouter()

const defaultImage = ref('/images/pasta.png')

const menus = computed(() => {
  // return buildMenus({
  //   menus: filteredMenus.value.map((menu: any) => menu.id) || [],
  //   tagsHash: tagsHash.value,
  //   menusHash: menusHash.value
  // })
  return filteredMenus.value
})

const onClickMenu = (menu: any) => {
  setCurrentMenu({ menu: menu })

  router.push({
    path: '/menus/d',
    query: { menuID: menu.id },
  })
}
</script>
