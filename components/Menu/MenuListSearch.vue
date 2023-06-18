<template>
  <v-row
    dense
    no-gutters
    align="center"
  >
    <v-col
      cols="12"
      sm="6"
    >
      <v-card
        flat
        color="brown2"
      >
        <v-card-text class="pa-0">
          <v-chip-group
            v-model="state.chips"
            multiple
            class="text-grey"
            selected-class="text-brown1"
          >
            <v-chip
              v-for="tag in allTags"
              :key="tag.id"
              :value="tag.id"
              :ripple="false"
              variant="text"
              density="compact"
              label
              class="ma-1 px-1 text-center"
              @click="onClickTag(tag)"
            >
              #{{ tag.name }}
            </v-chip>
          </v-chip-group>

        </v-card-text>
      </v-card>
    </v-col>

    <v-col
      cols="10"
      sm="5"
    >
      <v-text-field
        v-model="state.name"
        class="px-2"
        variant="outlined"
        density="compact"
        hide-details
        placeholder="料理名"
        color="brown1"
        @input="onChangeName"
      ></v-text-field>
    </v-col>

    <v-col
      cols="2"
      sm="1"
    >
      <v-btn
        variant="text"
        elevation="0"
        color="brown2"
        :ripple="false"
        :disabled="!state.name.length && !state.tags.length"
        @click="onClickClose"
      >
        <v-icon
          color="brown1"
          size="x-large"
        >
          mdi-close
        </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { MenuTableListStoreType } from "@/composables/menu-tables/use-menu-table-list"
import MenuTableListStoreKey from "@/composables/menu-tables/use-menu-table-list-key"
import { MenuListStoreType } from "@/composables/menus/use-menu-list"
import MenuListStoreKey from "@/composables/menus/use-menu-list-key"

const { allTags, allMenus } = inject(MenuTableListStoreKey) as MenuTableListStoreType
const { filterMenus } = inject(MenuListStoreKey) as MenuListStoreType

const state = reactive<{
  name: any,
  tags: any,
  chips: any
}>({
  name: '',
  tags: [],
  chips: []
})

const name = computed(() => {
  return state.name
})

const tags = computed(() => {
  return state.tags
})

const onClickTag = (tag: any) => {
  if(state.tags.includes(tag.id)) {
    const index = state.tags.indexOf(tag.id)
    state.tags.splice(index, 1)
  } else {
    state.tags.push(tag.id)
  }

  filter()
}

const onChangeName = () => {
  filter()
}

const filter = () => {
  filterMenus({
    menus: allMenus.value,
    name: name.value,
    tags: tags.value,
  })
}

const onClickClose = () => {
  state.name = ''
  state.tags = []
  state.chips = []
  filter()
}

onMounted(() => {
  filter()
})
</script>
