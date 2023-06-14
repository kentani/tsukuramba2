<template>
  <v-row
    dense
    align="center"
  >
    <v-col cols="12">
      <v-card
        flat
        color="brown2"
      >
        <v-row dense>
          <v-col cols="12">
            <v-card-title
              class="justify-center pa-0 pb-2 text-h4 font-weight-bold"
              style="color: rgb(var(--v-theme-brown1))"
            >
              <v-row
                dense
                justify="center"
                align="center"
              >
                <v-col
                  cols="2"
                  class="d-flex justify-center"
                  align-self="center"
                >
                  <v-btn elevation="0" size="x-large" color="brown2" :ripple="false" @click="onClickPrevWeek">
                    <v-icon color="brown1" size="x-large">
                      mdi-chevron-left
                    </v-icon>
                  </v-btn>
                </v-col>

                <v-col
                  cols="4"
                  class="d-flex justify-center"
                  align-self="center"
                >
                  <span class="brown1-text">{{ currentMonth }}</span>
                </v-col>

                <v-col
                  cols="2"
                  class="d-flex justify-center"
                  align-self="center"
                >
                  <v-btn elevation="0" size="x-large" color="brown2" :ripple="false" @click="onClickNextWeek">
                    <v-icon color="brown1" size="x-large">
                      mdi-chevron-right
                    </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-title>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { MenuTableStoreType } from "@/composables/menu-tables/use-menu-table"
import MenuTableStoreKey from "@/composables/menu-tables/use-menu-table-key"

const { currentMonth, changeWeek } = inject(MenuTableStoreKey) as MenuTableStoreType

const onClickPrevWeek = () => {
  changeWeek({ type: 'prev' })
}

const onClickNextWeek = () => {
  changeWeek({ type: 'next' })
}
</script>
