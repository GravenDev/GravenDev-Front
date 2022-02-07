<template>
  <div :class="{
    'tabs-container': true,
    vertical,
  }">
    <div class="tabs" :style="{
        '--radius': radius
    }">
      <div class="selector"
           :style="{
        '--position': selected,
      }">
      </div>
      <button
        v-for="[index, tab] in Object.entries(tabs)"
        :aria-label="`Onglet : ${tab}`"
        :class="{
                'tab': true,
                'active': selected === Number(index)
              }"
        @click="selected = Number(index)"
        :key="tab">
        <span>
          {{ tab }}
        </span>
      </button>
    </div>
    <div class="tabs-content-container">
      <transition name="fade" type="transition" mode="out-in" duration="10">
        <slot :name="tabs[selected]"/>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class Tabs extends Vue {
  @Prop({ default: [] })
  private tabs: string[] | undefined;

  @Prop({ default: false })
  private vertical: boolean | undefined;

  @Prop({ default: '.5rem' })
  private radius!: string;

  private selected = 0;
}
</script>

<style scoped lang="scss">
@use '../assets/style/colors';

.tabs-container.vertical {
  $padding-and-gap: 1rem;
  $height: 3rem;
  $bg: rgba(colors.$bg-secondary, .75);
  $b-rad: .5rem;

  display: grid;
  grid-template-columns: 1fr 9fr;
  grid-gap: $padding-and-gap;

  margin-bottom: 1rem;

  color: white;

  .tabs {
    background-color: colors.$bg-primary;

    position: relative;
    height: fit-content;
    padding: $padding-and-gap;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    grid-gap: calc($padding-and-gap / 2);

    border-radius: var(--radius);
  }

  .tab {
    width: 100%;
    height: $height;
    padding: $padding-and-gap;

    z-index: 1;

    transition: .1s;

    border-radius: $b-rad;

    border: .1rem solid colors.$bg-secondary;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    &:not(.active):hover {
      background-color: colors.$bg-secondary;
    }
  }

  .selector {
    background: $bg;

    position: absolute;
    height: $height;
    width: calc(100% - 2 * $padding-and-gap);

    border-radius: $b-rad;

    transform: translateY(
        calc(
          (var(--position) - 1) * ($padding-and-gap / 2)
          + (var(--position) - 1) * $height)
    );
    left: $padding-and-gap;

    user-select: none;

    transition: transform .3s ease-out;
  }
}

.tabs-container:not(.vertical) {
  $padding-and-gap: 1rem;
  $width: 8rem;
  $height: 3rem;
  $bg: rgba(colors.$bg-secondary, .75);
  $b-rad: .5rem;

  $mobile-padding-and-gap: .5rem;

  display: grid;
  grid-template-rows: 1fr auto;
  grid-gap: $padding-and-gap;

  margin-bottom: 1rem;

  @media screen and (max-width: 640px) {
    grid-gap: $mobile-padding-and-gap !important;
  }

  color: white;

  .tabs {
    background-color: colors.$bg-primary;

    position: relative;
    height: fit-content;
    padding: $padding-and-gap;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    grid-gap: calc($padding-and-gap / 2);

    overflow-x: auto;

    border-radius: var(--radius);

    @media screen and (max-width: 640px) {
      grid-gap: calc($mobile-padding-and-gap / 2) !important;
    }

    .tab {
      width: $width;
      min-width: $width;
      height: $height;
      padding: $padding-and-gap;

      border: .1rem solid colors.$bg-secondary;

      z-index: 1;

      transition: .1s;

      border-radius: $b-rad;

      display: flex;
      align-items: center;
      justify-content: center;

      @media screen and (max-width: 640px) {
        padding: $mobile-padding-and-gap !important;
      }

      &:not(.active):hover {
        background-color: colors.$bg-secondary;
      }
    }

    .selector {
      background: $bg;

      position: absolute;
      height: $height;
      width: calc($width);

      border-radius: $b-rad;

      transform: translateX(
          calc(
            (var(--position)) * ($padding-and-gap / 2)
            + (var(--position)) * $width)
      );
      left: $padding-and-gap;

      user-select: none;

      transition: transform .3s ease-out;

      @media screen and (max-width: 640px) {
        transform: translateX(
            calc(
              (var(--position)) * ($mobile-padding-and-gap / 2)
              + (var(--position)) * $width)
        ) !important;
      }
    }
  }
}
</style>
