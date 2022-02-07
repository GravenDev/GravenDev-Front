<template>
  <div class="managing-overview">
    <div class="cards">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import PendingTag from '@/models/pending-tag';
import UserTagApi from '@/api/user-tag-api';

@Component
export default class AdminHome extends Vue {
  private pendingTags: PendingTag[] = [];

  get authToken(): string {
    return this.$store.getters['app/getAuthToken'];
  }

  async created(): Promise<void> {
    this.pendingTags = await UserTagApi.getSuggestions(this.authToken);
    await this.$store.dispatch('app/loaded');
  }
}
</script>

<style scoped lang="scss">
@use '../../assets/style/colors';
@use '../../assets/style/card';

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));

  padding: 1rem;
  grid-gap: 1rem;

  max-width: 100%;
  width: 100%;

  .card {
    @include card.card(colors.$bg-primary);
  }
}
</style>
