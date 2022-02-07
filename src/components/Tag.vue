<template>
  <div class="tag" :class="{
        rounded,
        dark
      }"
      :style="{
         '--color': '#' + color,
      }"
       draggable="true">
    <slot/>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';
import Color from 'color';

@Component
export default class Tag extends Vue {
  @Prop({ default: 'FFFFFF' })
  private color: string | undefined;

  @Prop({
    default: false,
  })
  private rounded: boolean | undefined;

  get dark(): boolean {
    return Color(`#${this.color}`)
      .isDark();
  }
}
</script>

<style scoped lang="scss">
@use '../assets/style/colors';

.tag {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  grid-gap: .2rem;

  padding: .4rem .6rem;

  border: var(--color) .125rem solid;
  border-radius: .5rem;

  user-select: none;
  cursor: pointer;

  transition: .15s;

  color: var(--color);

  position: relative;

  min-width: 36px;
  height: 36px;
  font-weight: 600;

  &:hover {
    background-color: var(--color);
  }

  &.dark:hover {
    color: white;
  }
  &:not(.dark):hover {
    color: black;
  }

  /*&::before {
    all: inherit;

    content: '';
    position: absolute;

    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    opacity: .2;

    transition: .2s;
  }

  &:hover::before {
    background: var(--color);
  }*/

  &:active::before {
    opacity: .3;
  }

  &.rounded {
    border-radius: 9999px !important;
  }

  * {
    color: inherit;
  }

  @media screen and (max-width: 640px) {
    font-size: 14px;
    border-width: .1rem;
  }
}
</style>
