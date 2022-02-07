<template>
  <div class="users">
    <div class="cards">
      <div class="card-wrapper" v-for="user in users" :key="user.discordId">
        <div class="user-card">
          <div class="card-header" :class="{light: isLight('#' + user.accentColor)}"
               :style="{
          backgroundImage: `url(${user.bannerUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#' + user.accentColor,
        }">
            <img :src="user.avatarUrl" alt="Avatar"/>
            <div class="names">
              <h3 v-if="!!user.nickname">{{ user.nickname }}</h3>
              <h3>{{ user.tag }}</h3>
            </div>
          </div>
          <div class="card-content">
            <div class="tags-container">
              <h3>Tags :</h3>

              <span class="no-tags" v-if="user.tags.length === 0">
                <span>❔ Aucun tag</span>
              </span>
              <div class="tags">
                <Tag :color="tag.color" rounded v-for="tag in user.tags.slice(0,4)" :key="tag.id">
                  {{ tag.name }}
                </Tag>
                <Tag v-if="user.tags.length > 4">...</Tag>
              </div>
            </div>
            <div class="description" v-show="loaded">
              <h3>Description :</h3>
              {{ truncate(user.intro || '', 150) }}
            </div>
          </div>
          <div class="card-actions">
            <router-link :to="{name: 'User', params: {discordId: user.discordId}}" class="btn">
              <i class="mdi mdi-account-arrow-right mdi-24px"></i>
              Aller à l'utilisateur
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Color from 'color';
import removeMarkdown from 'remove-markdown';
import User from '@/models/user';
import userApi from '@/api/user-api';
import UserAboutApi from '@/api/user-about-api';
import Tag from '@/components/Tag.vue';
import TagGroup from '@/components/TagGroup.vue';

@Component({
  components: {
    TagGroup,
    Tag,
  },
})
export default class Users extends Vue {
  private users: User[] = [];

  async created(): Promise<void> {
    await this.$store.dispatch('app/loading');

    this.users = await userApi.getAllUsers();

    // eslint-disable-next-line no-restricted-syntax
    for (const user of this.users) {
      // eslint-disable-next-line no-await-in-loop
      user.intro = removeMarkdown((await UserAboutApi.getUserIntro(user)).text ?? '❔ Aucune description');
    }

    await this.$store.dispatch('app/loaded');
  }

  // eslint-disable-next-line class-methods-use-this
  isLight(color = '#ffffff'): boolean {
    return Color(color ?? '#ffffff')
      .isLight();
  }

  // eslint-disable-next-line class-methods-use-this
  truncate(str: string, len: number): string {
    if (str.length > len) {
      return `${str.substring(0, len)}...`;
    }
    return str;
  }

  get loaded(): boolean {
    return this.$store.getters['app/isLoading'] === false;
  }
}
</script>

<style scoped lang="scss">
@use '../../assets/style/colors';

.cards {
  padding: 1rem;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 360px), 1fr));
  grid-gap: 1rem;

  .user-card {
    width: 100%;
    height: 426px;

    border-radius: .5rem;
    overflow: hidden;

    background-color: colors.$bg-secondary;

    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;

    & > * {
      width: 100%;
      height: 100%;
    }

    .card-header {
      width: 100%;

      padding: 1rem;

      display: flex;
      align-items: center;
      justify-content: flex-start;
      grid-gap: 1rem;

      color: white;

      max-height: 128px;

      h3 {
        font-size: 1.5rem;
        font-weight: 800;

        &:nth-child(2) {
          font-size: 1.2rem;
          font-weight: 600;
        }
      }

      &.light {
        color: black;
      }

      img {
        width: 96px;
        height: 96px;

        border-radius: 50%;

        border: 4px colors.$green solid;
      }
    }

    .card-content {
      padding: 1rem;
      color: white;

      h3 {
        font-size: 1.2rem;
        font-weight: 800;
      }

      & > div {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        grid-gap: .5rem;
        flex-direction: column;
        margin-bottom: .5rem;
      }

      .tags {
        display: flex;
        grid-gap: .5rem;
        flex-wrap: wrap;

        * {
          min-width: max-content;
          font-size: .9rem;
          padding: .25rem .5rem;
        }
      }
    }

    .card-actions {
      justify-self: flex-end;
      align-self: flex-end;

      height: fit-content;

      .btn {
        border-radius: 0;

        background-color: lighten(colors.$bg-secondary, 10%) !important;

        &:hover {
          background-color: colors.$bg-thirdary !important;
        }

        &:active {
          background-color: colors.$bg-primary !important;
        }
      }
    }
  }
}
</style>
