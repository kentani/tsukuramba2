<template>
  <v-container style="height: 100%;">
    <div>Login</div>

    <v-row
      dense
      justify="center"
      align="center"
      style="height: 100%;"
    >
      <v-col
        cols="12"
        class="text-center"
      >
        <v-btn
          outlined
          size="large"
          elevation="4"
          color="brown"
          style="text-transform: none"
          @click="onClickGoogleLogin"
        >
          <v-icon left>
            mdi-google
          </v-icon>
          <span class="ml-2">Sign in with Google</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'login'
})

import { AuthStoreType } from "@/composables/use-auth";
import AuthStoreKey from "@/composables/use-auth-key";

const { login } = inject(AuthStoreKey) as AuthStoreType;

const router = useRouter()

const onClickGoogleLogin = () => {
  login().then(() => {
    router.push('/menu-tables')
  })
};
</script>
