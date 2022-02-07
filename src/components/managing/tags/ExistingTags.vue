<template>
  <div class="approved">
    <h2>
      Tags existants :
    </h2>
    <div class="table approved">
      <div class="row">
        <div class="cell">
            <span>
              Couleur :
            </span>
        </div>
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
              Actions :
            </span>
        </div>
      </div>
      <div class="row" v-for="tag in existingTags" :key="JSON.stringify(tag)">
        <div class="cell">
          <div
            class="color-round"
            :style="{'--color': colorOf(tag.color)}"
          />
        </div>
        <div class="cell">
          <i class="mdi mdi-24px"
             :class="{[tag.icon]: true}"
             v-if="!!tag.icon"/>
        </div>
        <div class="cell">
          {{ tag.name }}
        </div>
        <div class="cell"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import userTagApi from '@/api/user-tag-api';
import Tag from '@/models/tag';

@Component
export default class ExistingTags extends Vue {
  existingTags: Tag[] = [];

  async created(): Promise<void> {
    await this.$store.dispatch('app/loading');
    this.existingTags = await userTagApi.getAllTags();
    await this.$store.dispatch('app/loaded');
  }

  colorOf = (color: string): string => `#${(color ?? 'FFFFFF').toString()}`;
}
</script>

<style scoped lang="scss">
.row {
  grid-template-columns: 1fr 1fr 5fr 2fr;
}
</style>
