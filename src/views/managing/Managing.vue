<template>
  <div class="managing">
    <div class="too-small">
      <i class="mdi mdi-cookie"/>
      <h1>
        Apparemment, le dev avait pas le temps de faire le responsive pour la partie du staff<br/>
        <span>*Eating cookies...*</span><br/>
      </h1>
    </div>
    <div class="managing-content">
      <div class="header">
        <h1>Panel de gestion</h1>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class Managing extends Vue {
}
</script>

<style scoped lang="scss">
@use '../../assets/style/colors';

.managing {
  .managing-content {
    box-sizing: border-box !important;

    position: relative;

    @media screen and(max-width: 1190px) {
      display: none;
    }
  }

  .too-small {
    display: none;

    align-items: center;
    justify-content: center;

    flex-direction: column;

    width: 100%;
    height: 100%;

    text-align: center;

    padding: 3rem;

    h1, i {
      color: colors.$bg-secondary;
    }
    i{
      font-size: 96px;
    }
    span {
      color: lighten(colors.$bg-secondary, 10%);
    }

    @media screen and(max-width: 1190px) {
      display: flex;
    }
  }
}

.header {
  //position: sticky;
  //top: 75px;

  background-color: colors.$info;
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

    &:not(.admin) {
      background-color: #00000010;

      &:hover {
        background-color: #00000020;
      }

      &:active {
        background-color: #00000030;
      }
    }

    &.admin {
      background-color: colors.$red;

      &:hover {
        background-color: lighten(colors.$red, 10%);
      }

      &:active {
        background-color: lighten(colors.$red, 5%);

      }
    }
  }
}
</style>
