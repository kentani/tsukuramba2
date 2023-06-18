<template>
  <div
    v-if="currentMenu.ogp?.url"
  >
    <div
      v-if="label.length"
      class="pb-2 text-brown1 text-body-2"
    >
      {{ label }}
    </div>

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
        <v-col cols="7">
          <div class="pa-2 text-body-2 text-brown1 font-weight-bold">
            {{ currentMenu.ogp?.title }}
          </div>

          <v-btn
            v-show="currentMenu.ogp?.url?.length > 0"
            variant="text"
            color="brown1"
            class="px-2 py-0"
            @click="onClickOpenReference"
          >
            参考サイトを開く
          </v-btn>
        </v-col>

        <v-col cols="5">
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
  </div>

</template>

<script setup lang="ts">
import { MenuStoreType } from "@/composables/menus/use-menu"
import MenuStoreKey from "@/composables/menus/use-menu-key"

const { currentMenu } = inject(MenuStoreKey) as MenuStoreType

const props = withDefaults(defineProps<{
  label?: string;
}>(), {
  label: "",
});

const onClickOpenReference = () => {
  window.open(currentMenu.value.reference, '_blank');
}
</script>
