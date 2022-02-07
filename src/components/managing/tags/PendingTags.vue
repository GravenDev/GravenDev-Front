<template>
  <div class="pending">
    <h2>
      Tags en attente de validation :
    </h2>
    <div class="table pending">
      <div class="row">
        <div class="cell">
            <span>
              Icône :
            </span>
        </div>
        <div class="cell">
            <span>
              Nom :
            </span>
        </div>
        <div class="cell">
            <span>
              Proposé par :
            </span>
        </div>
        <div class="cell">
            <span>
              Actions :
            </span>
        </div>
      </div>
      <div class="row" v-for="pending in pendings" :key="pending.id">
        <div class="cell">
          <i class="mdi mdi-24px"
             :class="{[pending.icon]: true}"
             v-if="!!pending.icon"/>
        </div>
        <div class="cell">
          {{ pending.name }}
        </div>
        <div class="cell user">
          <img :src="pending.user.avatarUrl" alt="" width="32">
          {{ pending.user.tag }}
        </div>
        <div class="cell actions">
          <VueCustomTooltip label="Aller à l'utilisateur" position="is-right">
            <router-link class="btn"
                         :to="{name: 'User', params: {discordId: pending.user.discordId}}">
              <i class="mdi mdi-account mdi-24px"></i>
            </router-link>
          </VueCustomTooltip>
          <VueCustomTooltip label="Supprimer cette suggestion" position="is-right">
            <button class="btn" >
              <i class="mdi mdi-delete mdi-24px"></i>
            </button>
          </VueCustomTooltip>
          <VueCustomTooltip label="Pré-remplir le formulaire de création" position="is-right">
            <button class="btn" @click="fill(pending)">
              <i class="mdi mdi-arrow-right mdi-24px"/>
            </button>
          </VueCustomTooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import PendingTag from '@/models/pending-tag';

import userTagApi from '@/api/user-tag-api';
import EventBus from '@/services/event-bus';

@Component
export default class PendingTags extends Vue {
  pendings: PendingTag[] = [];

  async created(): Promise<void> {
    this.pendings = (await userTagApi.getSuggestions(this.authToken)).sort((a, b) => b.id - a.id);
  }

  get authToken(): string {
    return this.$store.getters['app/getAuthToken'];
  }

  // eslint-disable-next-line class-methods-use-this
  fill(tag: PendingTag): void {
    EventBus.$emit('fill-tag-form', tag);
  }
}
</script>

<style scoped lang="scss">
@use '../../../assets/style/colors';

.table .row {
  grid-template-columns: 1fr 3fr 3fr 2fr;
  grid-gap: 1rem;

  .btn {
    background-color: transparent;
    width: fit-content;
    border-radius: 9999px;
    padding: 0 .5rem;

    &:hover {
      background-color: colors.$bg-thirdary;
    }

    &:active {
      background-color: mix(colors.$bg-secondary, colors.$bg-thirdary, 25%);
    }
  }
}
</style>
