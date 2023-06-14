<template>
  <v-card flat color="brown2">
    <v-card-title
      class="justify-center text-h5 d-flex"
      style="color: rgb(var(--v-theme-brown1))"
    >
      <div class="px-1">{{ currentMenuTable.month }}</div>
      <div class="">/</div>
      <div class="px-1">{{ currentMenuTable.date }}</div>
      <div class="px-1">{{ currentMenuTable.day }}</div>
    </v-card-title>

    <v-card-text class="px-0">
      <v-row dense no-gutters align="center">
        <v-col cols="12" class="d-flex align-center" style="color: rgb(var(--v-theme-brown1))">
          <div class="text-body-1">献立</div>
          <div class="px-2 text-h5">{{ menusCount }}</div>
        </v-col>
      </v-row>

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
          >
            <v-img
              class="align-end text-white"
              position="center center"
              height="240"
              :src="menu.url || menu.ogp?.image || ''"
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
  </v-card>
</template>

<script setup lang="ts">
import { MenuTableListStoreType } from "@/composables/menu-tables/use-menu-table-list"
import MenuTableListStoreKey from "@/composables/menu-tables/use-menu-table-list-key"
import { MenuTableStoreType } from "@/composables/menu-tables/use-menu-table"
import MenuTableStoreKey from "@/composables/menu-tables/use-menu-table-key"

const { tagsHash, menusHash } = inject(MenuTableListStoreKey) as MenuTableListStoreType
const { currentMenuTable, buildMenus } = inject(MenuTableStoreKey) as MenuTableStoreType

const menusCount = computed(() => {
  return currentMenuTable.value.menus?.length || 0
})

const menus = computed(() => {
  return buildMenus({
    menus: currentMenuTable.value.menus || [],
    tagsHash: tagsHash.value,
    menusHash: menusHash.value
  })
})
</script>

<style scoped>
.test {
  position: relative;
  display: inline-block;
}
.test:before {
  content: '';
  position: absolute;
  bottom: -5px;
  display: inline-block;
  width: 100%;
  height: 2px;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  background-color: #006666;
  border-radius: 2px;
}
</style>
