<template>
  <div v-if="user === undefined"
       class="not-found">
    <div class="err-container">
      <span>404</span>
      <h1>Utilisateur introuvable.</h1>
    </div>
  </div>
  <div v-else-if="!!user"
       class="user-container">
    <UserHeader :user="user"/>
    <div class="user-content">
      <Tabs
        :tabs="tabs.map(a => a.name)"
        :vertical="desktop">
        <div v-for="lTab in tabs"
             :key="lTab.name"
             :slot="lTab.name">
          <component :is="lTab.component" :user="user"/>
        </div>
      </Tabs>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Presentation from '@/components/user/Presentation.vue';
import UserApi from '@/api/user-api';
import UserModel from '@/models/user';
import Tag from '@/components/Tag.vue';
import TagGroup from '@/components/TagGroup.vue';
import Tabs from '@/components/Tabs.vue';
import UserHeader from '@/components/user/UserHeader.vue';

@Component({
  components: {
    UserHeader,
    TagGroup,
    Tag,
    Tabs,
  },
})
export default class User extends Vue {
  tab: unknown = null;

  tabs: { name: string, component: unknown }[] = [
    {
      name: 'Presentation',
      component: Presentation,
    },
    {
      name: 'Compétences',
      component: undefined,
    },
    {
      name: 'Projets',
      component: undefined,
    },
  ];

  user: UserModel | undefined | null = null;

  async created(): Promise<void> {
    this.user = await UserApi.getUserByDiscordId(this.$route.params.discordId);

    await this.$store.dispatch('app/loaded');
  }

  get desktop(): boolean {
    return this.$store.getters['app/isOnDesktop'];
  }

  get currentUser(): User | undefined {
    return this.$store.getters['user/getCurrentUser'];
  }
}
</script>

<style lang="scss" scoped>
@use '../../assets/style/colors';

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  background-image: url('/img/bg.png');
  background-size: cover;
  background-repeat: no-repeat;

  color: white;

  .err-container {
    font-size: 1.5rem;
    background-color: colors.$warning;
    padding: 3rem;
    border-radius: .5rem;

    span {
      font-size: 2rem;
      font-weight: bold;
    }
  }
}

.user-content {
  padding: 1rem 4rem 0 4rem;
}

@media screen and (max-width: 640px) {
  .user-content {
    padding: 1rem 1rem 0 1rem
  }
}

</style>
