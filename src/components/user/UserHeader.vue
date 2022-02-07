<template>
  <div class="user-header">
    <div class="banner"
         :style="{
            '--banner-color': '#' + user.accentColor,
            '--banner': `url(${user.bannerUrl}?size=2048)`
        }"
    />
    <div class="avatar-names-buttons-container">
      <div class="avatar-names-tags-container">
        <div class="avatar-names-container">
          <img :src="user.avatarUrl"
               alt="Avatar"
               class="elevation-6 avatar"/>
          <div class="names-container">
          <span v-if="user.nickname"
                class="user-nickname">
            {{ user.nickname.trim() }}
          </span>
            <span :class="{'user-tag': true, 'user-tag-nicknamed': !!user.nickname}">
            {{ user.tag.trim() }}
          </span>

            <div class="chips">
              <TagGroup :show="user.tags.length > 0">
                <Tag v-for="role in user.roles"
                     :key="role.name"
                     :color="role.color">
                  <i :class="role.icon + ' mdi'"/>

                  {{ role.name }}
                </Tag>
              </TagGroup>
            </div>
          </div>
        </div>
      </div>
      <div class="btns">
        <button
          :aria-label="!interested ? 'Ajouter aux favoris' : 'Retirer des favoris'"
          :disabled="isYourself"
          :class="{
            interested: true,
            active: interested,
            btn: true,
          }"
          @click="interested = !interested">
          <i :class="{
            'mdi': true,
            'mdi-star-remove': interested,
            'mdi-star-plus': !interested
          }"></i>
          {{
            !interested
              ? 'Ajouter aux favoris'
              : 'Retirer des favoris'
          }}
        </button>
        <router-link v-if="isYourself"
                     :to="{
                      name: 'UserEdit',
                      params: {
                        discordId: user.discordId
                      }
                     }"
                     class="btn">
          <i class="mdi mdi-pencil"/>
          Editer
        </router-link>
      </div>
    </div>
    <div class="roles" :class="{empty: (user.tags.length === 0)}">
      <div class="mobile-chips">
        <TagGroup :show="user.tags.length > 0">
          <Tag v-for="role in user.roles"
               :key="role.name"
               :color="role.color">
            <i :class="role.icon + ' mdi'"/>

            {{ role.name }}
          </Tag>
        </TagGroup>
      </div>
      <TagGroup :show="user.tags.length > 0">
        <Tag v-for="userTag in user.tags"
             :key="userTag.name"
             :color="userTag.color"
             rounded=true>
          <i :class="userTag.icon + ' mdi'"/>
          {{ userTag.name }}
        </Tag>
      </TagGroup>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import TagGroup from '@/components/TagGroup.vue';
import Tag from '@/components/Tag.vue';
import User from '@/models/user';

@Component({
  components: {
    Tag,
    TagGroup,
  },
})
export default class UserHeader extends Vue {
  interested = false;

  @Prop({
    required: true,
  })
  private user!: User;

  get currentUser(): User | undefined {
    return this.$store.getters['user/getCurrentUser'];
  }

  get isYourself(): boolean {
    return (this.user?.discordId ?? -2) === (this.currentUser?.discordId ?? -1);
  }

  get desktop(): boolean {
    return this.$store.getters['app/isOnDesktop'];
  }
}
</script>

<style scoped lang="scss">
@use '../../assets/style/colors';

.banner {
  width: 100%;
  height: 184px;

  background-color: var(--banner-color);
  background-image: var(--banner);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.avatar-names-buttons-container {
  display: flex;
  justify-content: space-between;

  padding: 1rem 4rem;
}

.avatar-names-tags-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.avatar-names-container {
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 2rem;

  .avatar {
    background-color: white;
    border-radius: 50%;
    max-width: 128px;
    max-height: 128px;
  }

  .names-container {
    display: flex;

    flex-direction: column;
    justify-content: center;

    align-items: start;

    color: white;

    .user-nickname {
      font-size: 3rem;
      font-weight: 600;
    }

    .user-tag {
      font-size: 3rem;
      font-weight: 600;

      &.user-tag-nicknamed {
        font-size: 2rem;
        font-weight: normal;
      }
    }
  }
}

.btns {
  display: flex;
  grid-gap: .5rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .btn.interested:not(:disabled) {
    background-color: colors.$green;

    &.active {
      background-color: colors.$red;

      &:hover {
        background-color: lighten(colors.$red, 5%);
      }

      &:active {
        background-color: darken(colors.$red, 10%);
      }
    }

    &:hover {
      background-color: lighten(colors.$green, 5%);
    }

    &:active {
      background-color: darken(colors.$green, 10%);
    }
  }
}

.chips {
  padding: .5rem 0 0 0;
}

.mobile-chips {
  display: none;
}

.roles:not(.empty) {
  background: colors.$bg-primary;
  margin: 0 4rem 0 4rem;
  padding: .5rem;
  border-radius: .5rem;
}

@media screen and(max-width: 960px) {
  .avatar-names-buttons-container {
    align-items: center;
    flex-direction: column;
    grid-gap: 1rem;

    .avatar-names-container {
      align-items: center;
      justify-content: center;
      grid-gap: 1rem;

      .avatar {
        max-width: 84px;
        max-height: 84px;
      }

      .names-container {
        margin-top: 0;

        .user-nickname {
          font-size: 2rem;
        }

        .user-tag {
          font-size: 2rem;

          &.user-tag-nicknamed {
            font-size: 1.5rem;
          }
        }
      }
    }

    .btns {
      align-items: center;
      flex-direction: row;

      width: 100%;
    }
  }

  .chips {
    display: none;
  }

  .mobile-chips {
    display: flex;
  }
}

@media screen and (max-width: 640px) {
  .banner {
    height: 128px;
  }
  .avatar-names-buttons-container {
    padding: 1rem;

    .btns {
      flex-direction: column;
    }
  }

  .avatar-names-container {
    position: relative;
  }

  .roles {
    margin: 0 1rem 0 1rem !important;
  }
}

</style>
