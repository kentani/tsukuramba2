<template>
  <v-row
    dense
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
            v-model="form.tags"
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
        v-model="form.name"
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
      class="text-center"
    >
      <v-btn
        variant="text"
        elevation="0"
        color="brown2"
        :ripple="false"
        :disabled="!form.name.length && !form.tags.length"
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

const { allTags } = inject(MenuTableListStoreKey) as MenuTableListStoreType

const state = reactive<{
  form: any,
}>({
  form: { name: '', tags: [] },
})

const form = computed(() => {
  return state.form
})

const onClickTag = (tag: any) => {

}

const onChangeName = () => {

}

const onClickClose = () => {

}

const deepCopy = (obj: any) => {
  return JSON.parse(JSON.stringify(obj))
}
</script>
