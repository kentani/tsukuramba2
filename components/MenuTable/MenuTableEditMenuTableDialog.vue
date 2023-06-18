<template>
  <div>
    <v-dialog
      v-model="state.dialog"
      transition="dialog-bottom-transition"
      persistent
      fullscreen
      scrollable
    >
      <v-card
        flat
        rounded="0"
        color="brown2"
        class="py-4 px-2"
      >
        <v-card-title
          class="pa-2 pb-0 text-brown1 font-weight-bold"
        >
          <v-row
            density="compact"
            no-gutters
            justify="space-between"
            align="center"
          >
            <v-col>
              献立の編集
            </v-col>

            <v-col class="text-right">
              <v-btn
                variant="text"
                class="px-0"
                style="min-width: 0px;"
                @click="onClickCloseDialog"
              >
                <v-icon size="x-large">
                  mdi-close
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>

        <div class="pa-2">
          <div class="text-brown1 text-body-1 pb-1">
            選択済み
          </div>

          <MenuTableSelectedMenuList />
        </div>

        <div class="text-brown1 text-body-1 pa-2">
          メニュー検索
        </div>

        <v-card-text class="pa-2 pt-0">
          <v-divider class="mb-1"></v-divider>

          <MenuListSearch />

          <v-divider class="my-1"></v-divider>

          <MenuTableMenuList class="mt-4"/>
        </v-card-text>

        <v-card-actions class="py-0">
          <v-spacer />

          <v-btn
            class="text-brown1 font-weight-bold"
            style="min-width: 0px;"
            variant="text"
            size="large"
            :disabled="false"
            @click="onClickComplete"
          >
            <v-icon>mdi-check</v-icon>完了
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { MenuTableListStoreType } from "@/composables/menu-tables/use-menu-table-list"
import MenuTableListStoreKey from "@/composables/menu-tables/use-menu-table-list-key"
import { MenuTableStoreType } from "@/composables/menu-tables/use-menu-table"
import MenuTableStoreKey from "@/composables/menu-tables/use-menu-table-key"

const { allTags } = inject(MenuTableListStoreKey) as MenuTableListStoreType
const { currentMenuTable, updateMenuTable, setCurrentMenuTable } = inject(MenuTableStoreKey) as MenuTableStoreType

const state = reactive({
  dialog: false,
  currentMenuTableToRollBack: null,
  ogpLoaded: <string|null>null,
  selectedMenus: []
})

const onClickCloseDialog = () => {
  close({ reset: true })
}

const onClickComplete = async () => {
  await updateMenuTable({ id: currentMenuTable.value.id, menus: currentMenuTable.value.menus })
  close({ reset: false })
}

const open = () => {
  state.dialog = true
}

const close = (params: { reset: boolean }) => {
  if(params.reset) {
    setCurrentMenuTable({ menuTable: state.currentMenuTableToRollBack })
  }
  state.dialog = false
}

const setRollBackData = () => {
  state.currentMenuTableToRollBack = Object.assign({}, state.currentMenuTableToRollBack, currentMenuTable.value)
}

defineExpose({
  open,
  setRollBackData,
});
</script>
