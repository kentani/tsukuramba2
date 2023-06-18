<template>
  <v-card
    flat
    rounded="0"
    color="brown2"
  >
    <MenuBack class="my-1" />

    <v-img
      class="align-end text-white"
      position="center center"
      height="280"
      :src="currentMenu.url || currentMenu.ogp?.image || defaultImage"
      cover
    ></v-img>

    <v-card-title class="text-h6 text-brown1 font-weight-bold">
      <div>{{ currentMenu.name }}</div>
    </v-card-title>

    <v-card-text>
      <div
        v-for="tag in tags"
        :key="tag.id"
        class="py-0 px-1 text-center text-brown1 text-body-2 d-inline-block"
      >
        #{{ tag.name }}
      </div>

      <MenuAction
        class="my-3"
        @click-add-menu-table="onClickAddMenuTable"
        @click-edit-menu="onClickEditMenu"
      />

      <MenuLinkCard label="参考サイト" />
    </v-card-text>

    <MenuAddMenuTableDialog
      ref="menuAddMenuTableDialog"
    />

    <MenuEditMenuDialog
      ref="menuEditMenuDialog"
      @close="onClose"
    />
  </v-card>
</template>

<script setup lang="ts">
import { MenuTableListStoreType } from "@/composables/menu-tables/use-menu-table-list"
import MenuTableListStoreKey from "@/composables/menu-tables/use-menu-table-list-key"
import { MenuStoreType } from "@/composables/menus/use-menu"
import MenuStoreKey from "@/composables/menus/use-menu-key"

const { tagsHash } = inject(MenuTableListStoreKey) as MenuTableListStoreType
const { currentMenu } = inject(MenuStoreKey) as MenuStoreType

const defaultImage = ref('/assets/images/pasta.png')
const menuAddMenuTableDialog = ref()
const menuEditMenuDialog = ref()

const tags = computed(() => {
  return currentMenu.value.tags?.map((tagID: any) => tagsHash.value[tagID]).sort((a: any, b: any) => {
    if (a.sort < b.sort) {
      return -1
    }
  })
})

const onClose = (updated: boolean) => {
  if(updated) {
    console.log('aaaa')
  }
}

const onClickAddMenuTable = () => {
  openDialog('add-menu-table')
}

const onClickEditMenu = () => {
  openDialog('edit-menu')
}

const openDialog = (dialogType: any) => {
  switch(dialogType) {
    case 'add-menu-table':
      menuAddMenuTableDialog.value.open()
      break
    case 'edit-menu':
      menuEditMenuDialog.value.setRollBackData()
      menuEditMenuDialog.value.open({ isEdit: true })
      break
  }
}
</script>
