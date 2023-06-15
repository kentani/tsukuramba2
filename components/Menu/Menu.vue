<template>
  <v-card
    flat
    rounded="0"
    color="brown2"
  >
    <v-img
      class="align-end text-white"
      position="center center"
      height="240"
      :src="currentMenu.url || currentMenu.ogp?.image || defaultImage"
      cover
    ></v-img>

    <v-card-title class="px-0 text-h6 text-brown1 font-weight-bold">
      <div>{{ currentMenu.name }}</div>
    </v-card-title>

    <v-card-text class="px-0">
      <div
        v-for="tag in tags"
        :key="tag.id"
        class="py-0 px-1 text-center text-body-2 d-inline-block"
        style="color: rgb(var(--v-theme-brown1));"
      >
        #{{ tag.name }}
      </div>

      <v-row dense class="my-3">
        <v-col cols="6">
          <v-btn
            variant="outlined"
            block
            color="brown1"
          >
            <v-icon>mdi-pencil</v-icon>編集
          </v-btn>
        </v-col>

        <v-col cols="6">
          <v-btn
            variant="outlined"
            block
            color="grey"
            disabled
          >
            <v-icon>mdi-delete</v-icon>削除
          </v-btn>
        </v-col>
      </v-row>

      <v-row dense no-gutters align="center" class="mb-2">
        <v-col cols="12" class="d-flex align-center text-brown1">
          <div class="text-body-2">参考サイト</div>
        </v-col>
      </v-row>

      <v-card
        :loading="false"
        flat
        max-height="140"
        class="mb-2"
      >
        <v-row
          dense
          no-gutters
          align="center"
        >
          <v-col cols="8">
            <div class="pa-2 text-body-2 text-brown1 font-weight-bold">
              {{ currentMenu.ogp?.title }}
            </div>

            <v-btn
              v-show="currentMenu.ogp?.url?.length > 0"
              variant="text"
              color="brown1"
              class="px-2 py-0"
              @click=""
            >
              参考サイトを開く
            </v-btn>
          </v-col>

          <v-col cols="4">
            <div class="pa-2">
              <v-img
                max-height="120"
                position="center center"
                :src="currentMenu.ogp?.image"
                alt="OGP画像"
              ></v-img>
            </div>
          </v-col>
        </v-row>
      </v-card>

      <!-- <v-row dense no-gutters align="center" class="mb-2">
        <v-col cols="12" class="d-flex align-center text-brown1">
          <div class="text-body-2">材料</div>
        </v-col>
      </v-row>

      <v-row dense no-gutters align="center" class="mb-2">
        <v-col cols="12" class="d-flex align-center text-brown1">
          <div class="text-body-2">作り方</div>
        </v-col>
      </v-row> -->
    </v-card-text>
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

const tags = computed(() => {
  return currentMenu.value.tags?.map((tagID: any) => tagsHash.value[tagID]).sort((a: any, b: any) => {
    if (a.sort < b.sort) {
      return -1
    }
  })
})
</script>
