<template>
  <v-app :style="{ background: '#EFEBE9' }">
    <v-app-bar
      app
      fixed
      flat
      density="compact"
      color="brown1"
    >
      <v-toolbar-title class="mx-0">
        <v-row
          dense
          no-gutters
          class="px-2"
        >
          <div>
            <v-icon>mdi-chef-hat</v-icon>
          </div>

          <div class="text-left pt-1 pl-1">
            {{ title }}
          </div>
        </v-row>
      </v-toolbar-title>
    </v-app-bar>

    <v-main v-show="true">
      <slot />
    </v-main>

    <v-bottom-navigation grow>
      <v-btn
        v-for="item in bottomItems"
        :key="item.icon"
        color="brown1"
        size="small"
        @click="onClickBottomBtn(item)"
      >
        <v-icon color="brown1" size="large">{{ item.icon }}</v-icon>
        <span class="text-brown1 text-caption">{{ item.name }}</span>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script setup lang="ts">
import { AuthStoreType } from "@/composables/use-auth";
import AuthStoreKey from "@/composables/use-auth-key";

const title = ref('つくらんば');
const { isLogined, user, confirmAuth } = inject(AuthStoreKey) as AuthStoreType;
const router = useRouter()
const showable = computed(() => {
  return isLogined.value && user.value && (user.value.approved || user.value.admin)
})

const bottomItems = ref([
  { name: '献立表', icon: 'mdi-silverware', to: '/menu-tables' },
  { name: 'メニュー', icon: 'mdi-silverware-fork-knife', to: '/menus' },
  { name: 'アナリシス', icon: 'mdi-google-analytics', to: '/analysis' },
])

const onClickBottomBtn = (item: any) => {
  router.push(item.to)
}

onBeforeMount(() => {
  confirmAuth().then(async () => {
    if (!user.value) {
      // 未ログイン
      return router.push('/login')
    }
  })
})
</script>
