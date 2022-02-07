<template>
  <!--<v-container>-->
    <h1 class="text--white" style="color: white !important;">Logging in...</h1>
  <!--</v-container>-->
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import UserApi from '@/api/user-api';

@Component
export default class LoginCallback extends Vue {
  async created(): Promise<void> {
    if (this.$route.query.code) {
      await UserApi.login(this.authToken, this.code);
    }
    await this.$store.dispatch('user/fetchLoggedInUser');
    await this.$router.push('/');
  }

  get authToken(): string {
    return this.$store.getters['app/getAuthToken'];
  }

  get code(): string {
    return this.$route.query.code.toString();
  }
}
</script>

<style scoped>

</style>
