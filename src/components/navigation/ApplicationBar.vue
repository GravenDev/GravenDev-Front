<template>
  <div class="navbar">
    <div class="left">
      <button
        aria-label="Activer ou désactiver le tirroir de navigation"
        class="drawer-button"
        @click="handleDrawerSwitch()">
        <i class="mdi mdi-menu mdi-24px"/>
      </button>
      <img src="/img/logo.png" width="56" alt="Logo">
      <span>Graven - Développement</span>
    </div>
    <div class="center">
      <Input placeholder="Rechercher" icon="mdi-magnify" />
    </div>
    <div class="right">
      <button
        aria-label="Activer la barre de recherche"
        class="search">
        <i class="mdi mdi-24px mdi-magnify"/>
      </button>
      <UserDropdownMenu/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import Vue from 'vue';
import User from '@/models/user';
import UserDropdownMenu from '@/components/navigation/UserDropdownMenu.vue';
import Input from '@/components/Input.vue';

@Component({
  components: { Input, UserDropdownMenu },
})
export default class ApplicationBar extends Vue {
  get currentUser(): User {
    return this.$store.getters['user/getCurrentUser'];
  }

  get loggedIn(): boolean {
    return this.$store.getters['user/isLoggedIn'];
  }

  get opened(): boolean {
    return this.$store.getters['app/isDrawerOpened'];
  }

  get desktop(): boolean {
    return this.$store.getters['app/isOnDesktop'];
  }

  handleDrawerSwitch(): void {
    this.$store.dispatch('app/switchDrawerState');
  }
}
</script>

<style lang="scss">
@use '../../assets/style/colors';

.navbar {
  height: 75px;
  width: 100%;

  position: sticky;
  top: 0;

  z-index: 10;

  background: colors.$bg-primary;

  box-shadow: #101010 0 0 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  * {
    color: white;
  }

  .left {
    display: flex;
    align-items: center;
    grid-gap: 1rem;

    .drawer-button {
      margin-left: 1rem;
      border-radius: 50%;

      display: flex;
      align-items: center;
      justify-content: center;

      min-width: 48px;
      min-height: 48px;

      &:hover {
        background-color: colors.$bg-secondary;
      }
    }

    span {
      font-size: x-large;
    }
  }

  .right {
    display: flex;
    align-items: center;
  }
}

.search {
  height: 75px;
  padding: 0 1rem;

  display: none;
  align-items: center;
  grid-gap: 1rem;

  &:hover {
    background-color: colors.$bg-secondary;
  }
}

@media screen and (max-width: 1200px) {
  .center .input-container {
    width: 15rem !important;
  }
}

@media screen and (max-width: 1050px) {
  .center {
    display: none;
  }
  .search {
    display: flex;
  }
}

@media screen and (max-width: 760px) {
  .left {
    span {
      display: none;
    }
  }
}

@media screen and (max-width: 500px) {
  .left {
    grid-gap: 0 !important;
  }
  .right span {
    display: none;
  }
}
</style>
