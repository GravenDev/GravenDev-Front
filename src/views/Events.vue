<template>
<div>
  <h1 style="color: white;">Test !</h1>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class Events extends Vue {
  async created(): Promise<void> {
    await this.$store.dispatch('app/loaded');
  }
}
</script>

<style scoped>

</style>
