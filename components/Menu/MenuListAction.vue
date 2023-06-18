<template>
  <v-row
    dense
    justify="space-around"
    align="center"
  >
    <v-col cols="4" md="3" class="text-brown1">
      <div class="text-center text-caption">メニュー数</div>
      <div class="text-center text-h6 brown--text font-weight-bold">{{ menuCount }}</div>
    </v-col>

    <v-col cols="4" md="3" class="text-center">
      <v-btn
        variant="outlined"
        block
        color="brown1"
        @click="onClickAddMenu"
      >
        <v-icon>mdi-plus</v-icon>メニュー
      </v-btn>
    </v-col>

    <v-col cols="4" md="3" class="text-center">
      <v-btn
        variant="outlined"
        block
        disabled
        color="brown1"
        @click="onClickAddTag"
      >
      <v-icon>mdi-plus</v-icon>タグ
      </v-btn>
    </v-col>

    <MenuEditMenuDialog
      ref="menuEditMenuDialog"
      @close="onClose"
    />
  </v-row>
</template>

<script setup lang="ts">
import { MenuListStoreType } from "@/composables/menus/use-menu-list"
import MenuListStoreKey from "@/composables/menus/use-menu-list-key"

const { filteredMenus, addMenu } = inject(MenuListStoreKey) as MenuListStoreType
const menuEditMenuDialog = ref()

const menuCount = computed(() => {
  return filteredMenus.value.length
})

const onClickAddMenu = () => {
  openDialog('add-menu')
}

const onClickAddTag = () => {
}

const onClose = (menu?: any) => {
  if(menu) {
    addMenu({ menu: menu })
  }
}

const openDialog = (dialogType: any) => {
  switch(dialogType) {
    case 'add-menu':
      menuEditMenuDialog.value.setRollBackData()
      menuEditMenuDialog.value.open({ isEdit: false })
      break
  }
}
</script>
