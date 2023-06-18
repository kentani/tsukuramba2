<template>
  <v-row dense>
    <v-col cols="4">
      <v-btn
        variant="outlined"
        block
        color="brown1"
        @click="onClickAddMenuTable"
      >
        <v-icon>mdi-silverware</v-icon>献立
      </v-btn>
    </v-col>

    <v-col cols="4">
      <v-btn
        variant="outlined"
        block
        color="brown1"
        @click="onClickEditMenu"
      >
        <v-icon>mdi-pencil</v-icon>編集
      </v-btn>
    </v-col>

    <v-col cols="4">
      <v-btn
        variant="outlined"
        block
        color="brown1"
        disabled
      >
        <v-icon>mdi-delete</v-icon>削除
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
const emit = defineEmits()

const onClickAddMenuTable = () => {
  emit('click-add-menu-table')
}

const onClickEditMenu = () => {
  emit('click-edit-menu')
}
</script>
