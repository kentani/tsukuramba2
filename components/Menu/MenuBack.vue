<template>
  <v-row dense>
    <v-col>
      <v-btn
        variant="text"
        class="px-2"
        color="brown1"
        style="min-width: 0px;"
        @click="onClickBack"
      >
        <v-icon size="x-large">mdi-arrow-left</v-icon>
        <span class="px-1">戻る</span>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
const router = useRouter()

const onClickBack = () => {
  router.go(-1)
}
</script>
