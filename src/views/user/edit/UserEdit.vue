<template>
  <div class="container">
    <div class="btn-container">
      <router-link :to="{name: 'User', params: {id: currentUser.discordId}}" class="btn back-btn">
        <i class="mdi mdi-chevron-left"/>
        Retour à l'utilisateur
      </router-link>
    </div>
    <Tabs :tabs="tabs.map(a => a.name)" radius="0 0 .5rem .5rem">
      <div v-for="tab in tabs"
           :key="tab.name"
           :slot="tab.name">
        <component :is="tab.component"/>
      </div>
    </Tabs>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import Vue from 'vue';
import TagEdit from '@/components/user/edit/tags/TagEdit.vue';
import Tabs from '@/components/Tabs.vue';
import IntroEdit from '@/components/user/edit/intro/IntroEdit.vue';
import User from '@/models/user';

@Component({
  components: { Tabs },
})
export default class UserEdit extends Vue {
  tab: unknown = null;

  tabs: { name: string, component: unknown }[] = [
    {
      name: 'Tags',
      component: TagEdit,
    },
    {
      name: 'Présentation',
      component: IntroEdit,
    },
    /* {
      name: 'Compétences',
      component: GeneralEdit,
    },
    {
      name: 'Projets',
      component: GeneralEdit,
    }, */
  ];

  async created(): Promise<void> {
    const routeDiscordId = this.$route.params.discordId;

    await this.$store.dispatch('app/loading');

    if (!this.currentUser || routeDiscordId !== this.currentUser?.discordId) {
      await this.$router.push({
        name: 'User',
        params: {
          discordId: routeDiscordId,
        },
      });
    }
    await this.$store.dispatch('app/loaded');
  }

  get currentUser(): User | null | undefined {
    return this.$store.getters['user/getCurrentUser'];
  }
}
</script>

<style scoped lang="scss">
@use '../../../assets/style/colors';

.container {
  margin: 1rem;
  border-radius: .5rem;
  overflow: hidden;
}

.btn-container {
  background-color: colors.$bg-primary;
  padding: 1rem 1rem 0 1rem;
}

.btn.back-btn {
  width: fit-content;
  background-color: colors.$bg-thirdary;

  &:hover {
    background-color: colors.$bg-secondary;
  }
}
</style>
