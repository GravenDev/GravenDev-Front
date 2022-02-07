<template>
  <div :class="{
     'chip-group': true,
     'empty': !show
  }">
    <slot/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class ChipGroup extends Vue {
  @Prop({ default: true, required: false })
  private show!: boolean;
}
</script>

<style scoped lang="scss">
.chip-group {
  display: flex;
  flex-direction: row;
  grid-gap: .5rem;
  padding: .5rem;
  flex-wrap: wrap;

  overflow-x: auto;

  &.empty {
    padding: 0 !important;
  }
}
</style>
