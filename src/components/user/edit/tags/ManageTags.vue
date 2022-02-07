<template>
  <!--<v-card flat outlined elevation="2">
    <div class="alerts">
      <v-alert v-model="successSnackbar"
               timeout="3000"
               outlined dark
               color="green">
        Tags enregistrés !
      </v-alert>

      <v-alert v-model="errorSnackbar"
               timeout="3000"
               outlined dark
               type="error">
        Erreur lors de l'enregistrement des tags !
      </v-alert>
    </div>

    <v-card-title>Gérez vos tags.</v-card-title>
    <v-card-subtitle>
      Choisissez les tags qui vont apparaitre sur votre profil :
    </v-card-subtitle>
    <v-combobox
      light filled chips
      deletable-chips
      clear-icon="mdi-close"
      prepend-icon="mdi-tag"
      clearable
      class="pr-4 pl-4"
      v-model="selected"
      :items="tagNames"
      multiple
    >
      <template v-slot:item="{index, item}">
        <v-list-item-avatar size="32" :color="'#' + tagMap[item].color">
          <v-icon size="16" :color="tagMap[item].color ? 'white' : '#212121'">
            {{ tagMap[item].icon }}
          </v-icon>
        </v-list-item-avatar>
        {{ tagMap[item].name }}
      </template>
      <template v-slot:selection="{ attrs, item, parent, selected }">
        <v-chip :key="tagMap[item].name"
                v-bind="attrs"
                :color="`#${tagMap[item].color}`"
                :input-value="selected" outlined>
          <v-avatar class="mr-1">
            <v-icon>
              {{ tagMap[item].icon }}
            </v-icon>
          </v-avatar>
          <span class="pr-2">
            {{ tagMap[item].name }}
          </span>
          <v-icon small
                  @click="parent.selectItem(item)">
            $delete
          </v-icon>
        </v-chip>
      </template>
    </v-combobox>

    <v-card-actions>
      <v-btn text color="green" @click="saveTags()">
        <v-icon left>
          mdi-floppy
        </v-icon>
        Enregistrer
      </v-btn>
    </v-card-actions>
  </v-card>-->
  <div class="manage-tags">

    <h1>Gérez vos tags</h1>

    <div class="tags">
      <InputC placeholder="Rechercher un tag"
              icon="mdi-magnify"
              v-model="filter"
              rounded/>
      <div class="tag-container">
        <div
          class="tag"
          :class="{
          'active': selected.includes(tag.id),
        }"
          v-for="tag in allTags.filter(a => a.name.toLowerCase().includes(filter.toLowerCase()))"
          :key="tag.name"
          @click="toggleTag(tag)"
          :style="{color: colorFrom(tag.color)}">
          <div class="checkbox"></div>
          <i class="mdi mdi-24px"
             :class="{[tag.icon]: true}"/>
          {{ tag.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Tag from '@/models/tag';
import UserTagApi from '@/api/user-tag-api';
import User from '@/models/user';
import InputC from '@/components/Input.vue';
import TagC from '@/components/Tag.vue';

@Component({
  components: {
    TagC,
    InputC,
  },
})
export default class ManageTags extends Vue {
  private allTags: Tag[] = [];

  private selected: number[] = [];

  private filter = '';

  // eslint-disable-next-line class-methods-use-this
  colorFrom(color: string): string {
    return `#${color ?? 'ffffff'}`;
  }

  get currentUser(): User {
    return this.$store.getters['user/getCurrentUser'];
  }

  get authToken(): string {
    return this.$store.getters['app/getAuthToken'];
  }

  async toggleTag(tag: Tag): Promise<void> {
    if (this.selected.includes(tag.id ?? -1)) {
      this.selected = this.selected.filter((id) => id !== tag.id);

      await UserTagApi.removeTag(
        this.authToken,
        this.currentUser,
        tag,
      );
    } else {
      this.selected.push(tag.id ?? -1);

      await UserTagApi.addTag(
        this.authToken,
        this.currentUser,
        tag,
      );
    }
  }

  async created(): Promise<void> {
    this.selected = (await UserTagApi.getTagsOf(this.currentUser))
      .map((a) => a.id)
      .filter((a) => !!a) as number[];
    (await UserTagApi.getAllTags()).forEach((tag) => {
      this.allTags.push(tag);
    });

    await this.$store.dispatch('app/loaded');
  }
}
</script>

<style scoped lang="scss">
@use '../../../../assets/style/colors';

.manage-tags {
  padding: 1rem;

  background-color: colors.$bg-primary;
  border-radius: .5rem;

  .tags {
    padding: 1rem;
  }

  .tag-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: .2rem;

    max-height: 35rem;
    overflow: auto;
  }

  .input-container {
    margin-bottom: 1rem;
  }

  .tag {
    background-color: colors.$button-bg-primary;
    padding: .5rem;

    user-select: none;

    display: flex;
    align-items: center;
    grid-gap: .5rem;

    transition: .1s;

    border-radius: .5rem;

    @media screen and (max-width: 640px) {
      width: 100%;
    }

    &:hover {
      background-color: colors.$button-bg-hover;
    }

    .checkbox {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background-color: colors.$bg-primary;
      display: flex;
      justify-content: center;
      align-items: center;

      transition: .1s;
    }

    &.active {
      color: colors.$green;
      background: colors.$button-bg-active;

      &:hover {
        background-color: colors.$button-bg-hover;
      }

      .checkbox {
        background-color: colors.$green !important;
      }
    }
  }
}
</style>
