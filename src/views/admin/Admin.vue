<template>
  <div class="managing">
    <div class="header">
      <router-link :to="{name: 'AdminPanelHome'}" class="btn">
        <i class="mdi mdi-police-badge mdi-24px"></i>
        Panel administrateur
      </router-link>
      <router-link :to="{name: 'ManagingPanelHome'}" class="btn managing">
        <i class="mdi mdi-shield-star mdi-24px"></i>
        Panel de gestion
      </router-link>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class Admin extends Vue {
}
</script>

<style scoped lang="scss">
@use '../../assets/style/colors';

.managing {
  box-sizing: border-box !important;

  position: relative;
}

.header {
  position: sticky;
  top: 75px;

  background-color: colors.$error;
  color: white;
  padding: .75rem;

  display: flex;
  align-items: center;
  grid-gap: 1rem;

  a {
    font-size: 1rem;
    width: fit-content;

    display: flex;
    align-items: center;

    &:not(.managing) {
      background-color: #00000010;

      &:hover {
        background-color: #00000020;
      }

      &:active {
        background-color: #00000030;
      }
    }

    &.managing {
      background-color: colors.$blue;

      &:hover {
        background-color: lighten(colors.$blue, 10%);
      }

      &:active {
        background-color: lighten(colors.$blue, 5%);

      }
    }
  }
}
</style>
