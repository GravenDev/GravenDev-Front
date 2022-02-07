<template>
<div class=""></div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class Rules extends Vue {
  async created(): Promise<void> {
    await this.$store.dispatch('app/loaded');
  }
}
</script>
