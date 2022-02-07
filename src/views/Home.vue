<template>
  <div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import NewsCarousel from '@/components/NewsCarousel.vue';
import Tabs from '@/components/Tabs.vue';

@Component({
  components: { NewsCarousel, Tabs },
})
export default class Home extends Vue {
  tabs = [
    'Bonjour',
    'Hi',
    'Salut',
  ]

  async created(): Promise<void> {
    await this.$store.dispatch('app/loaded');
  }
}
</script>

<style lang="scss" scoped>
p {
  color: white;
}
</style>
