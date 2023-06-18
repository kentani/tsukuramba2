<template>
  <v-card
    flat
    color="brown2"
  >
    <v-card-title class="pa-0 pb-3 text-brown1">
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
            class="px-0"
            style="min-width: 0px;"
            variant="text"
            :ripple="false"
            @click="onClickPrevMonth"
          >
            <v-icon size="x-large">
              mdi-chevron-left
            </v-icon>
          </v-btn>
        </v-col>

        <v-col
          cols="6"
          class="d-flex justify-center"
          align-self="center"
        >
          <div>{{ state.currentYM }}</div>
        </v-col>

        <v-col
          cols="2"
          class="d-flex justify-center"
          align-self="center"
        >
          <v-btn
            class="px-0"
            style="min-width: 0px;"
            variant="text"
            :ripple="false"
            @click="onClickNextMonth"
          >
            <v-icon size="x-large">
              mdi-chevron-right
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text class="pa-0">
      <div class="d-flex">
        <div
          v-for="(day, index) in week"
          :key="day"
          class="py-1 text-center"
          :class="weekClass(index)"
          style="width: 14.2%;"
        >
          {{ day }}
        </div>
      </div>

      <div
        v-for="(week, index) in state.dateList"
        :key="`week-${index}`"
        class="d-flex"
      >
        <v-btn
          v-for="date in week"
          :key="date"
          class="text-center"
          style="width: 14.2%; min-width: 0px;"
          :style="dateStyle(date)"
          variant="text"
          size="small"
          elevation="0"
          :ripple="false"
          @click="onClickDate(date)"
        >
          <span :class="dateClass(date)">{{ date }}</span>
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import moment from 'moment'
// import 'moment/dist/locale/ja'

const emit = defineEmits();

const week = ref(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])

const state = reactive({
  currentDate: moment(),
  selectedDate: '',
  currentYM: moment().format('YYYY / MM'),
  dateList: <any>[]
})

const setCurrentYM = () => {
  state.currentYM = moment(state.currentDate).format('YYYY / MM')
}

const setDateList = () => {
  let dateList = []

  const startMonth = moment(state.currentDate).startOf('month')
  const endMonth = moment(state.currentDate).endOf('month')

  const prevMonthDateCount = startMonth.day() - 1
  if (prevMonthDateCount > 0) {
    dateList = new Array(prevMonthDateCount)
  }

  const currentDateCount = endMonth.date()

  for(let i = 1; i <= currentDateCount; i++) {
    dateList.push(i)
  }

  state.dateList = [
    dateList.slice(0,7),
    dateList.slice(7,14),
    dateList.slice(14,21),
    dateList.slice(21,28),
    dateList.slice(28,35),
  ]
}

const onClickPrevMonth = () => {
  state.currentDate = moment(state.currentDate).subtract(1, 'month')
  setCurrentYM()
  setDateList()
}

const onClickNextMonth = () => {
  state.currentDate = moment(state.currentDate).add(1, 'month')
  setCurrentYM()
  setDateList()
}

const onClickDate = (date: any) => {
  state.selectedDate = date
  emit('clickDate', moment(`${state.currentDate.format('YYYY-MM-')}${date}`))
}

const weekClass = (index: any) => {
  let klass = 'text-brown1'

  if(index === 5) {
    klass = 'text-blue'
  } else if(index === 6) {
    klass = 'text-red'
  }

  return klass
}

const dateClass = (date: any)  => {
  let klass = 'text-grey'

  if(date === moment(state.currentDate).date()) {
    klass = 'font-weight-bold text-brown1'
  }

  return klass
}

const dateStyle = (date: any) => {
  let style = ''

  if(date === state.selectedDate) {
    style = 'border: 1px solid rgb(var(--v-theme-brown1));'
  }

  return style
}

onMounted(() => {
  setDateList()
})
</script>
