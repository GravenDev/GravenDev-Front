<template>
  <div class="app">
    <div class="overlay" :class="{active: loading}">
      <div class="loader">
      </div>
    </div>
    <application-bar/>
    <div class="content">
      <navigation-drawer/>
      <transition name="fade" mode="out-in">
        <router-view :key="$route.fullPath"/>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import ApplicationBar from '@/components/navigation/ApplicationBar.vue';
import NavigationDrawer from '@/components/navigation/NavigationDrawer.vue';

import 'ress/ress.css';

@Component({
  components: {
    NavigationDrawer,
    ApplicationBar,
  },
})
export default class App extends Vue {
  async created(): Promise<void> {
    const interval: { id: number } = {
      id: -1,
    };
    window.onresize = () => this.$store.dispatch('app/updateOnDesktop');
    await this.$store.dispatch('app/updateOnDesktop');
    await this.$store.dispatch('router/autoLinksFill', [this.$router, this.$route]);
    if (await this.load(interval)) return;
    interval.id = setInterval(async () => this.load(interval), 1000);
  }

  get loading(): boolean {
    return this.$store.getters['app/isLoading'];
  }

  get authToken(): string {
    return this.$store.getters['app/getAuthToken'];
  }

  async load({ id }: { id: number }): Promise<boolean> {
    try {
      await this.$store.dispatch('app/validateAuthToken');

      await this.$store.dispatch('user/fetchLoggedInUser');

      if (!this.$store.getters['app/isLoading']) {
        clearInterval(id);
      }

      return true;
    } catch (e) {
      return false;
    }
  }
}
</script>

<style lang="scss">
@use './assets/style/colors';

@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@200;400;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

:root {
  --red: #EE3408;
  --blue: #34ACE0;
  --bg-primary: #242220;
}

* {
  font-family: 'Quicksand', sans-serif;
  font-weight: 500;

  scrollbar-width: thin;
}

#app, .app {
  min-height: 100vh;
  max-width: 100vw !important;
  background-color: darken(colors.$bg-primary, 5%);
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: .1s;
  transition-property: opacity;
  transition-timing-function: linear;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

.content {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 0;

  min-height: calc(100vh - 75px);
  max-width: 100vw !important;

  position: relative;

  * {
    max-width: 100% !important;
  }
}

@media screen and (max-width: 1050px) {
  .content {
    display: grid;
    grid-template-columns: 0 auto;

    & > * {
      width: 100%;
    }
  }
}

button.btn, a.btn {
  outline: none;
  border: none;
  font-weight: 600;

  color: white;
  text-decoration: none;

  padding: .75rem 1.25rem;
  min-width: fit-content;
  width: 100%;

  background-color: colors.$primary;

  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: .5rem;

  border-radius: .25rem;

  transition: .2s;

  &:disabled {
    background-color: colors.$gray;
    color: lighten(colors.$gray, 25%);
  }

  &:not(:disabled):hover {
    background-color: lighten(colors.$primary, 5%);
  }

  &:not(:disabled):active {
    background-color: lighten(colors.$primary, 10%);
  }
}

.alert {
  min-height: 48px;

  border: transparent .25rem solid;
  border-radius: .5rem;

  margin: .5rem 0 0 0;

  display: flex;

  .txt {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;

    padding: .5rem 0;

    width: 100%;

    * {
      color: white;
    }
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 24px;

    min-width: 64px !important;
  }

  ul {
    padding: 0 1.5rem;
  }

  &.error {
    border-color: colors.$error;
    background-color: mix(#FFFFFF50, colors.$red, 75%);
  }

  &.success {
    border-color: colors.$success;
    background-color: mix(#FFFFFF50, colors.$green, 75%);
  }

  &.info {
    border-color: colors.$info;
    background-color: mix(#FFFFFF50, colors.$info, 75%);
  }
}

* {
  scroll-behavior: smooth;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, .5);

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  grid-gap: 3rem;

  z-index: 100;

  transition: .2s;

  color: white;

  opacity: 0;

  &:not(.active) {
    user-select: none;
    user-focus: none;

    animation: bgize .2s linear forwards;

    @keyframes bgize {
      0% {
        z-index: 100;
      }
      100% {
        z-index: -1;
      }
    }
  }

  &.active {
    opacity: 1;
  }

  .loader {
    border: .5rem solid colors.$bg-secondary;
    border-bottom-color: colors.$primary;
    border-top-color: colors.$primary;

    border-radius: 50%;

    width: 5rem;
    height: 5rem;

    animation: spin 2s ease-in-out infinite;

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      25% {
        transform: rotate(180deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
}

</style>
