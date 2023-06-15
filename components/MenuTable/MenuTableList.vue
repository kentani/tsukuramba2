<template>
  <v-row
    dense
    no-gutters
    align="center"
  >
    <v-col
      v-for="(menuTable, index) in currentMenuTables"
      :key="menuTable.date"
      cols="12"
    >

      <v-divider />

      <v-card
        flat
        height="150"
        color="brown2"
        :ripple="false"
        @click="onClickMenuTable(menuTable)"
      >
        <v-row
          dense
          align="center"
          style="height: 100%;"
        >
          <v-col cols="2">
            <v-card-title class="pa-0 text-center" style="color: rgb(var(--v-theme-brown1))">
              <div class="text-h5" style="line-height: 26px;">{{ menuTable.date }}</div>
              <div class="text-body-2" style="line-height: 26px;">{{ menuTable.day }}</div>
            </v-card-title>
          </v-col>

          <v-col
            cols="10"
            md="9"
            style="height: 100%;"
          >
            <v-card
              flat
              color="brown2"
              style="height: 100%;"
            >
              <v-row
                dense
                align="center"
                style="height: 100%; overflow-y: scroll;"
              >
                <v-col>
                  <v-card-text class="pl-0 text-body-1">
                    <ul>
                      <li
                        v-for="(menu, index) in menus(menuTable.menus)"
                        :key="`${menuTable.date}-${index}`"
                        class="pb-1"
                      >
                        {{ menu.name }}
                      </li>
                    </ul>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card>

      <v-divider v-if="index === currentMenuTables.length - 1" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { MenuTableListStoreType } from "@/composables/menu-tables/use-menu-table-list"
import MenuTableListStoreKey from "@/composables/menu-tables/use-menu-table-list-key"
import { MenuTableStoreType } from "@/composables/menu-tables/use-menu-table"
import MenuTableStoreKey from "@/composables/menu-tables/use-menu-table-key"

const { tagsHash, menusHash, currentMenuTables } = inject(MenuTableListStoreKey) as MenuTableListStoreType
const { currentMenuTable, setCurrentMenuTable, createMenuTable, buildMenus } = inject(MenuTableStoreKey) as MenuTableStoreType

const router = useRouter()

const onClickMenuTable = async (menuTable: any) => {
  if (menuTable.id) {
    setCurrentMenuTable({ menuTable: menuTable })
  } else {
    await createMenuTable({ yyyymmdd: menuTable.yyyymmdd })
  }


  router.push({
    path: '/menu-tables/d',
    query: { menuTableID: currentMenuTable.value.id }
  })
}

const menus = (menus: any) => {
  return buildMenus({
    menus: menus || [],
    tagsHash: tagsHash.value,
    menusHash: menusHash.value
  })
}
</script>

<style scoped>
ul, ol {
  padding: 0;
}

ul li {
  position: relative;
  list-style-type: none!important;/*ポチ消す*/
  padding: 0.5em 0.5em 0.5em 0.5em;
  margin-bottom: 5px;
  line-height: 1.5;
  background: rgb(var(--v-theme-brown3));
  vertical-align: middle;
  color: #505050;
  border-radius: 15px 0px 0px 15px;/*左側の角丸く*/
}

ul li:before{
  display: inline-block;
  vertical-align: middle;
  /*以下白丸つくる*/
  content:'';
  width:1em;
  height: 1em;
  background: #fff;
  border-radius: 50%;
  margin-right: 8px;
  margin-bottom: 5px;
}
</style>
