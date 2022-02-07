<template>
  <div class="manage-tags">
    <h1>Gestion des tags</h1>
    <div class="panels">
      <div class="panel">
        <PendingTags/>
      </div>
      <div class="panel">
        <CreateTag/>
      </div>
      <div class="panel">
        <ExistingTags/>
      </div>
      <div class="panel">
        <EditTag/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import userTagApi from '@/api/user-tag-api';
import Tag from '@/models/tag';
import Input from '@/components/Input.vue';
import PendingTags from '@/components/managing/tags/PendingTags.vue';
import ExistingTags from '@/components/managing/tags/ExistingTags.vue';
import CreateTag from '@/components/managing/tags/CreateTag.vue';
import EditTag from '@/components/managing/tags/EditTag.vue';

@Component({
  components: {
    EditTag,
    CreateTag,
    ExistingTags,
    PendingTags,
    Input,
  },
})
export default class ManagingTags extends Vue {
}
</script>

<style lang="scss">
@use '../../assets/style/colors';

.manage-tags {
  padding: 1.5rem;

  display: flex;
  flex-direction: column;
  grid-gap: 1rem;

  & > .panels > .panel > div {
    padding: 1rem;
    background-color: colors.$bg-primary;
    border-radius: .5rem;
  }
}

.panels {
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .panel > div {
    height: fit-content;
  }
}

h1, h2 {
  color: white;
}

.table {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  grid-gap: .25rem;

  margin-top: 1rem;

  color: white;

  border-radius: .5rem;

  .row {
    display: grid;
    width: 100%;
    background-color: colors.$bg-secondary;
    border: .1rem solid colors.$bg-thirdary;
    align-items: center;

    height: 48px;

    padding-left: 1rem;

    border-radius: .5rem;

    &:first-of-type {
      background-color: colors.$bg-thirdary;
    }

    .cell {
      .color-round {
        width: 24px;
        height: 24px;
        background-color: var(--color);
        border-radius: 50%;
        border: 1px solid colors.$bg-primary;
      }

      &.actions {
        display: flex;
      }

      &.user {
        display: flex;
        align-items: center;
        grid-gap: .5rem;

        img {
          border-radius: 50%;
          min-width: 32px;
          min-height: 32px;

          background-color: white;
        }
      }
    }
  }
}
</style>
