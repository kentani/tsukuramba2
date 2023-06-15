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

    <!-- <v-col cols="4" md="3" class="text-center">
      <v-btn
        variant="outlined"
        block
        disabled
        color="brown1"
        @click="onClickAddTag"
      >
      <v-icon>mdi-plus</v-icon>タグ
      </v-btn>
    </v-col> -->
  </v-row>
</template>

<script setup lang="ts">
import { MenuListStoreType } from "@/composables/menus/use-menu-list"
import MenuListStoreKey from "@/composables/menus/use-menu-list-key"

const { filteredMenus } = inject(MenuListStoreKey) as MenuListStoreType

const menuCount = computed(() => {
  return filteredMenus.value.length
})

const onClickAddMenu = () => {

}

const onClickAddTag = () => {

}
</script>
