<template>
  <div class="not-logged-in" v-if="!loggedIn">
    <router-link :to="{ name: 'Connexion' }">
      <i class="mdi mdi-login mdi-24px"></i>
      <span>Se connecter</span>
    </router-link>
  </div>
  <div class="logged-in" v-else>
    <div class="menu-wrapper"
         @mouseenter="() => {if(desktop) menuOpened = true}"
         @mouseleave="() => {if(desktop) menuOpened = false}"
         v-click-outside="clickOutside">
      <button
        aria-label="Ouvrir / Fermer le menu déroulant utilisateur"
        :class="{active: menuOpened}"
        @click="() => {if(!desktop) menuOpened =! menuOpened}">
        <img
          class="avatar"
          :src="currentUser.avatarUrl"
          alt="Avatar"
          width="56"
          draggable="false"
        />
        <span>{{ currentUser.tag }}</span>
        <i class="mdi mdi-chevron-down"></i>
      </button>

      <transition name="fade" appear>
        <div class="menu-container"
             v-if="menuOpened"
             @click="clickOutside">
          <router-link :to="{
            name: 'User',
             params: {
              discordId: currentUser.discordId
            }
          }">
            <i class="mdi mdi-account mdi-24px"></i>
            Mon profil
          </router-link>
          <router-link :to="{ name: 'Panel de gestion' }"
                       v-if="currentUser.roles.map((a) => a.name).includes('Modération')">
            <i class="mdi mdi-shield-star mdi-24px"></i>
            Panel de gestion
          </router-link>
          <router-link :to="{ name: 'Panel d\'administration' }"
                       v-if="currentUser.roles.map((a) => a.name).includes('Administration')">
            <i class="mdi mdi-police-badge mdi-24px"></i>
            Panel d'administration
          </router-link>
          <router-link :to="{ name: 'Logout', }">
            <i class="mdi mdi-logout mdi-24px"></i>
            Se déconnecter
          </router-link>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import User from '@/models/user';

@Component
export default class UserDropdownMenu extends Vue {
  private menuOpened = false;

  get currentUser(): User {
    return this.$store.getters['user/getCurrentUser'];
  }

  get loggedIn(): boolean {
    return this.$store.getters['user/isLoggedIn'];
  }

  get desktop(): boolean {
    return this.$store.getters['app/isOnDesktop'];
  }

  clickOutside(): void {
    this.menuOpened = false;
  }
}
</script>

<style lang="scss" scoped>
@use '../../assets/style/colors';

.not-logged-in {
  display: flex;
  align-items: center;

  a {
    height: 75px;
    padding: 0 1rem;

    display: flex;
    align-items: center;
    grid-gap: 1rem;

    text-decoration: none;

    &.router-link-exact-active {
      background-color: colors.$bg-thirdary;
    }

    &:hover {
      background-color: colors.$bg-secondary;
    }
  }
}

.logged-in {
  display: flex;
  align-items: center;

  button {
    height: 75px;
    padding: 0 1rem;

    display: flex;
    align-items: center;
    grid-gap: 1rem;

    &:hover, &.active {
      background-color: colors.$bg-secondary;
    }

    span {
      font-size: large;
      font-weight: 600;
    }

    .avatar {
      border-radius: 50%;
    }
  }
}

.menu-wrapper {
  position: relative;

  .menu-container {
    position: absolute;
    top: 100%;
    background: colors.$bg-primary;
    width: 100%;

    // box-shadow: $primary-bg 0 0 10px;

    border-radius: 0 0 0 1rem;

    a {
      height: 25px;
      padding: 25px;

      display: flex;
      align-items: center;
      grid-gap: 1rem;

      color: white;
      text-decoration: none;

      &.router-link-exact-active {
        background-color: colors.$bg-thirdary;

        &:hover {
          background-color: colors.$bg-thirdary !important;
        }
      }

      &:last-of-type {
        border-radius: 0 0 0 1rem;
      }

      &:hover {
        background-color: colors.$bg-secondary;
      }
    }
  }
}

@media screen and (max-width: 500px) {
  .menu-wrapper {
    position: static !important;
  }
  .menu-container {
    position: absolute !important;
    width: 100vw !important;
    left: 0 !important;
    top: 75px;
    border-radius: 0 !important;
  }
}
</style>
