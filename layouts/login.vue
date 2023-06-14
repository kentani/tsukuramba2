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

    <v-main v-show="showable">
      <slot />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { AuthStoreType } from "@/composables/use-auth";
import AuthStoreKey from "@/composables/use-auth-key";

const title = ref('つくらんば');
const { user, confirmAuth } = inject(AuthStoreKey) as AuthStoreType;
const router = useRouter()
const state = reactive({
  showable: false
})
const showable = computed(() => {
  return state.showable
})

onBeforeMount(() => {
  confirmAuth().then(async () => {
    if (user.value) {
      // 未ログイン
      return router.push('/menu-tables')
    } else {
      state.showable = true;
    }
  })
})
</script>
