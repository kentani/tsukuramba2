<template>
  <v-container style="height: 100%;">
    <!-- <div>TOP</div>
    <div>isLogined: {{ isLogined }}</div>
    <div>uid: {{ currentUser?.uid }}</div>
    <div>displayName: {{ currentUser?.displayName }}</div>
    <div>userID: {{ user?.id }}</div>
    <div>admin: {{ user?.admin }}</div>
    <div>approved: {{ user?.approved }}</div> -->

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
          rounded
          large
          elevation="4"
          color="white"
          style="text-transform: none"
          @click="onClickGoogleLogout"
        >
          <v-icon left>
            mdi-google
          </v-icon>
          <span class="ml-2">Sign out with Google</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'root'
})

import { AuthStoreType } from "@/composables/use-auth";
import AuthStoreKey from "@/composables/use-auth-key";

const { isLogined, currentUser, user, logout } = inject(AuthStoreKey) as AuthStoreType;

const onClickGoogleLogout = () => {
  logout()
};
</script>
