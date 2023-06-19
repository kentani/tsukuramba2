<template>
  <v-card flat color="brown2">

    <MenuBack class="mt-1"/>

    <v-card-title class="justify-center text-h5 d-flex text-brown1 pt-0 pb-3">
      <div class="px-1">{{ currentMenuTable.month }}</div>
      <div class="">/</div>
      <div class="px-1">{{ currentMenuTable.date }}</div>
      <div class="px-1">{{ currentMenuTable.day }}</div>
    </v-card-title>

    <v-card-text>
      <MenuTableAction
        @click-edit-menu-table="onClickEditMenuTable"
      />

      <v-row dense>
        <v-col
          v-for="menu in menus"
          :key="menu.id"
          cols="12"
          sm="6"
          lg="4"
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
              height="240"
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

            <v-card-text class="py-1 px-0">
              <div
                v-for="tag in menu.tags"
                :key="tag.id"
                class="py-0 px-1 text-center text-body-2 d-inline-block"
                style="color: rgb(var(--v-theme-brown1));"
              >
                #{{ tag.name }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>

    <MenuTableEditMenuTableDialog
      ref="menuTableEditMenuTableDialog"
    />
  </v-card>
</template>

<script setup lang="ts">
import { MenuTableListStoreType } from "@/composables/menu-tables/use-menu-table-list"
import MenuTableListStoreKey from "@/composables/menu-tables/use-menu-table-list-key"
import { MenuTableStoreType } from "@/composables/menu-tables/use-menu-table"
import MenuTableStoreKey from "@/composables/menu-tables/use-menu-table-key"

const { tagsHash, menusHash } = inject(MenuTableListStoreKey) as MenuTableListStoreType
const { currentMenuTable, setCurrentMenuTable, buildMenus } = inject(MenuTableStoreKey) as MenuTableStoreType

const menuTableEditMenuTableDialog = ref()
const defaultImage = ref('/images/pasta.png')

const router = useRouter()

const menus = computed(() => {
  return buildMenus({
    menus: currentMenuTable.value.menus || [],
    tagsHash: tagsHash.value,
    menusHash: menusHash.value
  })
})

const onClickMenu = (menu: any) => {
  router.push({
    path: '/menus/d',
    query: { menuID: menu.id }
  })
}

const onClickEditMenuTable = () => {
  openDialog('edit-menu-table')
}

const openDialog = (dialogType: any) => {
  switch(dialogType) {
    case 'edit-menu-table':
      menuTableEditMenuTableDialog.value.setRollBackData()
      menuTableEditMenuTableDialog.value.open()
      break
  }
}
</script>

<style scoped>
</style>
