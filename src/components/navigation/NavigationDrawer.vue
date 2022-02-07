<template>
  <div class="drawer-container" :class="{opened}">
    <div :class="{drawer: true, opened}" :style="{'--bg': accentLinkColor}">
      <div v-for="link in links" :key="link.name" @click="close">
        <VueCustomTooltip
          v-if="!link.name.includes('Divider')"
          :active="!opened"
          :label="link.name"
          position="is-right"
        >
          <router-link class="item"
                       :to="link.path"
                       draggable="false">
            <i :class="{
            mdi: true,
            [link.meta.icon]: true,
            'mdi-24px': true
          }"/>
            <span class="name" v-show="opened">
            {{ link.name }}
        </span>
          </router-link>
        </VueCustomTooltip>
        <div class="divider" v-else></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import Vue from 'vue';
import { RouteRecordPublic } from 'vue-router';

@Component
export default class NavigationDrawer extends Vue {
  get desktop(): boolean {
    return this.$store.getters['app/isOnDesktop'];
  }

  get opened(): boolean {
    return this.$store.getters['app/isDrawerOpened'];
  }

  get links(): RouteRecordPublic[] {
    return this.$store.getters['router/getLinks'];
  }

  get accentLinkColor(): string {
    return this.$store.getters['router/getAccentLinkColor'];
  }

  close(): void {
    if (!this.desktop && this.opened) {
      this.$store.dispatch('app/closeDrawer');
    }
  }
}
</script>

<style scoped lang="scss">
@use '../../assets/style/colors';

.drawer-container {
  width: 60px;

  transition: .3s width;

  &.opened {
    width: 300px;
  }
}

.drawer {

  height: 100%;
  width: 60px;
  padding-top: 10px;

  z-index: 9;

  background-color: var(--bg);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  grid-gap: .5rem;

  position: fixed;
  top: 75px;

  transition: .3s width, .3s background-color;

  &.opened {
    width: 300px;
  }

  & > * {
    width: 100%;
  }

  .divider {
    width: 100%;
    height: 1px;
    background: colors.$bg-secondary;
  }

  .item {
    width: calc(100% - .5rem);
    padding: .5rem 1rem;
    border-radius: 0 9999px 9999px 0;

    display: flex;
    grid-gap: 1rem;
    align-items: center;

    text-decoration: none;

    transition: .2s;

    &.router-link-exact-active {
      background-color: colors.$bg-secondary;

      i {
        color: colors.$primary;
      }
    }

    &:hover {
      background-color: colors.$bg-secondary;
    }

    i {
      color: white;
      transition: .2s;
    }

    span {
      color: white;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

  }
}

@media screen and (max-width: 1050px) {
  .drawer:not(.opened) {
    width: 0;

    * {
      opacity: 0;
      user-select: none;
    }
  }
  .drawer {
    width: 300px;

    box-shadow: #101010 0 0 10px;

    * {
      opacity: 100%;
      user-select: auto;
    }
  }
}
</style>
