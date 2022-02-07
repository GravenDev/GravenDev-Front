<template>
  <div class="tag-edit">
    <div class="container">
      <ManageTags/>
    </div>
    <div class="container">
      <SubmitNewTag/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import Vue from 'vue';
import ManageTags from '@/components/user/edit/tags/ManageTags.vue';
import SubmitNewTag from '@/components/user/edit/tags/SubmitNewTag.vue';

@Component({
  components: {
    SubmitNewTag,
    ManageTags,
  },
})
export default class TagEdit extends Vue {
}
</script>

<style scoped lang="scss">
.tag-edit {
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-gap: 1rem;

  @media screen and (max-width: 960px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }
}
</style>
