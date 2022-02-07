<template>
  <div class="managing-overview">
    <div class="cards">
      <div class="card">
        <div class="card-header">
          Suggestions de tags en attente :
        </div>
        <div class="card-content">
          {{ pendingTags }}
        </div>
        <div class="card-actions">
          <router-link :to="{name: 'Gestion des tags'}" class="btn">Détails</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import UserTagApi from '@/api/user-tag-api';

@Component
export default class ManagingHome extends Vue {
  private pendingTags = 0;

  get authToken(): string {
    return this.$store.getters['app/getAuthToken'];
  }

  async created(): Promise<void> {
    this.pendingTags = await UserTagApi.getSuggestionsCount(this.authToken);
    await this.$store.dispatch('app/loaded');
  }
}
</script>

<style scoped lang="scss">
@use '../../assets/style/card';
@use '../../assets/style/colors';

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));

  /*
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    flex-grow: 1;
  */
  padding: 1rem;
  grid-gap: 1rem;

  max-width: 100%;
  width: 100%;

  .card {
    @include card.card(colors.$bg-primary);
  }
}
</style>
