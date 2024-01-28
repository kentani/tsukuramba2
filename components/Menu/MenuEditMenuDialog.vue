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

            <v-col cols="12" id="canvas-wrapper" class="justify-center">
              <p class="text-overline">{{ state.fileName }}</p>
              <canvas id="canvas" width="0" height="0"></canvas>
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
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, uploadString } from "firebase/storage";
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
  newImage: '',
  fileName: '',
  currentMenuToRollBack: null,
  ogpLoading: <string|boolean>false,
})

const onClickCloseDialog = () => {
  close({ reset: true })
}

const onClickComplete = async () => {
  if (state.newImage.length) {
    await uploadImage()
  }

  if(state.isEdit) {
    await updateMenu({ menu: currentMenu.value })
  } else {
    await createMenu({ menu: currentMenu.value })
  }

  updateFilteredMenus({ menu: currentMenu.value });
  close({ reset: false })
}

const uploadImage = async () => {
  const storage = getStorage()
  const imageRef = ref(storage, state.fileName)

  await uploadString(imageRef, state.newImage, "data_url").then(async () => {
    await getDownloadURL(imageRef).then(async (url) => {
      const menu ={
        ...currentMenu.value,
        url: url,
        imageName: state.fileName,
      }
      setCurrentMenu({ menu: menu })
    });
  });
}

const onChangeName = () => {
  // 何もしない
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

const onChangeImage = (f: any) => {
  if(!f) return

  const file = f.target.files[0]
  if(!file) return

  state.fileName = file.name

  const image: any = new Image()
  const reader = new FileReader()

  reader.readAsDataURL(file)
  reader.onload = (e: any) => {
    image.src = e.target.result
    image.onload = () => {
      state.newImage = makeImage(image)
      makeTumbnail(image)
    }
  }
}

const makeImage = (image: any) => {
  const canvas: any = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const ratio = image.height / image.width
  const width = 1024
  const height = width * ratio
  canvas.height = height
  canvas.width = width
  ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height)
  return canvas.toDataURL('image/jpeg')
}

const makeTumbnail = (image: any) => {
  const canvas: any = document.getElementById("canvas")
  const ctx = canvas.getContext('2d')
  const ratio = image.height / image.width
  const width = 256
  const height = width * ratio
  canvas.height = height
  canvas.width = width
  ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height)
}

const open = async (params: { isEdit: boolean }) => {
  state.isEdit = params.isEdit
  state.fileName = currentMenu.value.imageName || currentMenu.value.name

  console.log(currentMenu.value)

  const image: any = new Image()
  image.src = currentMenu.value.url
  image.crossOrigin = "anonymous";
  image.onload = () => {
    // state.newImage = makeImage(image)
    makeTumbnail(image)
  }

  state.dialog = true
}

const close = async (params: { reset: boolean }) => {
  if (!state.isEdit && currentMenu.value.url?.length) {
    await deleteImage()
  }

  if(params.reset) {
    setCurrentMenu({ menu: state.currentMenuToRollBack })
  }

  state.newImage = ''
  state.fileName = ''
  state.dialog = false
}

const deleteImage = async () => {
  // const storage = getStorage()
  // const imageRef = ref(storage, currentMenu.value.imageName)

  // await deleteObject(imageRef)
}

const setRollBackData = () => {
  state.currentMenuToRollBack = Object.assign({}, state.currentMenuToRollBack, currentMenu.value)
}

defineExpose({
  open,
  setRollBackData,
});
</script>
