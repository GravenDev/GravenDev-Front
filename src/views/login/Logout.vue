<template>
  <v-container>
    <h1 class="text--white" style="color: white !important;">Logging out...</h1>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import UserApi from '@/api/user-api';

@Component
export default class Logout extends Vue {
  async created(): Promise<void> {
    const token = await UserApi.logout(this.authToken);
    this.$store.commit('app/setAuthToken', token);
    await this.$store.dispatch('user/fetchLoggedInUser');
    await this.$router.push('/');
  }

  get authToken(): string {
    return this.$store.getters['app/getAuthToken'];
  }
}

</script>
