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
          class="pa-2 pb-4 text-brown1 font-weight-bold"
        >
          <v-row
            density="compact"
            no-gutters
            justify="space-between"
            align="center"
          >
            <v-col>
              メニューの編集
            </v-col>

            <v-col class="text-right">
              <v-btn
                id="close-edit-menu-dialog-btn"
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

        <v-card-text class="pa-2">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="currentMenu.name"
                variant="underlined"
                label="料理名"
                color="brown1"
                density="compact"
                hide-details
                @change="onChangeName"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-file-input
                label="料理画像"
                variant="underlined"
                color="brown1"
                density="compact"
                hide-details
                @change="onChangeImage"
              ></v-file-input>
            </v-col>

            <v-col cols="12">
              <v-autocomplete
                v-model="currentMenu.tags"
                class="pb-4"
                :items="allTags"
                variant="underlined"
                item-title="name"
                item-value="id"
                chips
                small-chips
                label="タグ"
                color="brown1"
                item-color="brown1"
                multiple
                disable-lookup
                hide-details
              ></v-autocomplete>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="currentMenu.reference"
                variant="underlined"
                label="参考サイト"
                color="brown1"
                density="compact"
                hide-details
                @change="onChangeReference"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <MenuLinkCard
                :loading="state.ogpLoading"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="py-0">
          <v-spacer />

          <v-btn
            id="complete-edit-menu-btn"
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
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import axios from 'axios'

import { MenuTableListStoreType } from "@/composables/menu-tables/use-menu-table-list"
import MenuTableListStoreKey from "@/composables/menu-tables/use-menu-table-list-key"
import { MenuListStoreType } from "@/composables/menus/use-menu-list"
import MenuListStoreKey from "@/composables/menus/use-menu-list-key"
import { MenuStoreType } from "@/composables/menus/use-menu"
import MenuStoreKey from "@/composables/menus/use-menu-key"

const { allTags } = inject(MenuTableListStoreKey) as MenuTableListStoreType
const { updateFilteredMenus } = inject(MenuListStoreKey) as MenuListStoreType
const { currentMenu, createMenu, updateMenu, setCurrentMenu } = inject(MenuStoreKey) as MenuStoreType

const config = useRuntimeConfig()

const state = reactive({
  dialog: false,
  isEdit: false,
  currentMenuToRollBack: null,
  ogpLoading: <string|boolean>false,
})

const onClickCloseDialog = () => {
  close({ reset: true })
}

const onClickComplete = async () => {
  if(state.isEdit) {
    await updateMenu({ menu: currentMenu.value })
  } else {
    await createMenu({ menu: currentMenu.value })
  }

  updateFilteredMenus({ menu: currentMenu.value });
  close({ reset: false })
}

const onChangeName = () => {
  // 何もしない
}

const onChangeImage = (file: any) => {
  if(!file) return
  const firstFile = file.target.files[0]
  if(!firstFile) return

  const storage = getStorage()
  const imageRef = ref(storage, firstFile.name)

  uploadBytes(imageRef, firstFile).then(() => {
    getDownloadURL(imageRef).then(async (url) => {
      const menu ={
        ...currentMenu.value,
        url: url,
        imageName: firstFile.name,
      }
      setCurrentMenu({ menu: menu })
    });
  });
}

const onChangeReference = async () => {
  if(currentMenu.value.reference.length) {
    state.ogpLoading = 'brown'

    const invalidData = ['#N/A', '#VALUE!']
    await axios
      .get(`${config.public.fetchOgpApi}?url=${currentMenu.value.reference}`)
      .then((res) => {
        if (!invalidData.includes(res.data.title)) {
          const menu = {
            ...currentMenu.value,
            ogp: {...res.data},
          }
          setCurrentMenu({ menu: menu })
        }
      })
    state.ogpLoading = false
  } else {
    const ogp = { title: '', description: '', image: '', url: '' }
    const menu = {
      ...currentMenu.value,
      ...ogp,
    }
    setCurrentMenu({ menu: menu })
  }
}

const open = (params: { isEdit: boolean }) => {
  state.isEdit = params.isEdit
  state.dialog = true
}

const close = async (params: { reset: boolean }) => {
  if (!state.isEdit && currentMenu.value.url?.length) {
    await deleteImage()
  }

  if(params.reset) {
    setCurrentMenu({ menu: state.currentMenuToRollBack })
  }

  state.dialog = false
}

const deleteImage = async () => {
  const storage = getStorage()
  const imageRef = ref(storage, currentMenu.value.imageName)

  await deleteObject(imageRef)
}

const setRollBackData = () => {
  state.currentMenuToRollBack = Object.assign({}, state.currentMenuToRollBack, currentMenu.value)
}

defineExpose({
  open,
  setRollBackData,
});
</script>
