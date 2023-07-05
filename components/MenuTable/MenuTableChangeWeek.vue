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
              class="justify-center pa-0 pb-2 text-h4"
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
                  <v-btn
                    id="prev-week-btn"
                    elevation="0"
                    size="x-large"
                    color="brown2"
                    :ripple="false"
                    @click="onClickPrevWeek"
                  >
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
                  <div>{{ currentMonth }}</div>
                  <div>月</div>
                </v-col>

                <v-col
                  cols="2"
                  class="d-flex justify-center"
                  align-self="center"
                >
                  <v-btn
                    id="next-week-btn"
                    elevation="0"
                    size="x-large"
                    color="brown2"
                    :ripple="false"
                    @click="onClickNextWeek"
                  >
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
import { MenuTableListStoreType } from "@/composables/menu-tables/use-menu-table-list"
import MenuTableListStoreKey from "@/composables/menu-tables/use-menu-table-list-key"

const { currentMonth, changeWeek } = inject(MenuTableListStoreKey) as MenuTableListStoreType

const onClickPrevWeek = () => {
  changeWeek({ type: 'prev' })
}

const onClickNextWeek = () => {
  changeWeek({ type: 'next' })
}
</script>
