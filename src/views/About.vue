<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import Vue from 'vue';

@Component
export default class About extends Vue {
  async created(): Promise<void> {
    await this.$store.dispatch('app/loaded');
  }
}
</script>
