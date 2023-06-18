<template>
  <v-row dense>
    <v-col cols="6">
      <v-btn
        variant="outlined"
        block
        color="brown1"
        @click="onClickEditMenuTable"
      >
        <v-icon>mdi-pencil</v-icon>編集
      </v-btn>
    </v-col>

    <v-col cols="6">
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

const onClickEditMenuTable = () => {
  emit('click-edit-menu-table')
}
</script>
