<template>
  <div>
    <v-dialog
      v-model="state.dialog"
      transition="dialog-bottom-transition"
      persistent
      fullscreen
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
            dense
            no-gutters
            justify="space-between"
            align="center"
          >
            <v-col>
              献立表に追加
            </v-col>

            <v-col class="text-right">
              <v-btn
                id="close-add-menu-table-dialog-btn"
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

        <v-card-subtitle class="px-2">
          献立に追加する日付を選択
        </v-card-subtitle>

        <v-card-text class="px-2 pt-4 pb-0">
          <MenuCalender
            @click-date="onClickDateMenuCalender"
          />
        </v-card-text>

        <v-card-actions class="py-0">
          <v-spacer />

          <v-btn
            id="complete-add-menu-table-btn"
            class="text-brown1 font-weight-bold"
            style="min-width: 0px;"
            variant="text"
            size="large"
            :disabled="!state.selectedDate"
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
import { MenuTableStoreType } from "@/composables/menu-tables/use-menu-table"
import MenuTableStoreKey from "@/composables/menu-tables/use-menu-table-key"
import { MenuStoreType } from "@/composables/menus/use-menu"
import MenuStoreKey from "@/composables/menus/use-menu-key"

const { currentMenuTable, fetchMenuTable, createMenuTable, updateMenuTable } = inject(MenuTableStoreKey) as MenuTableStoreType
const { currentMenu } = inject(MenuStoreKey) as MenuStoreType

const state = reactive({
  dialog: false,
  selectedDate: null,
})

const onClickCloseDialog = () => {
  close()
}

const onClickComplete = async () => {
  await fetchMenuTable({
    yyyymmdd: state.selectedDate,
    force: true
  })

  let menus = [];

  if(currentMenuTable.value) {
    menus = currentMenuTable.value.menus
    menus.push(currentMenu.value.id)
    await updateMenuTable({
      id: currentMenuTable.value.id,
      menus: menus,
    })
  } else {
    menus.push(currentMenu.value.id)
    await createMenuTable({
      yyyymmdd: state.selectedDate,
      menus: menus
    })
  }

  close()
}

const onClickDateMenuCalender = (date: any) => {
  state.selectedDate = date.format('YYYY-MM-DD')
}

const open = () => {
  state.selectedDate = null
  state.dialog = true
}

const close = () => {
  state.selectedDate = null
  state.dialog = false
}

defineExpose({
  open,
});
</script>
