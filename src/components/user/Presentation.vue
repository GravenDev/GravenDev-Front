<template>
  <div class="presentation">
    <div class="g-el">
      <div class="card">
        <h1>Informations :</h1>
        <table>
          <tbody>
          <tr v-for="info in infos" :key="info.title">
            <td class="title">
            <span>
              <i :class="{mdi: true, [info.icon]: true}"/>
            {{ info.title }} :
              </span>
            </td>
            <td>{{ info.value }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="g-el">
      <div class="card">
        <div class="presentation-text">
          <p v-html="markdownIntro">
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { marked } from 'marked';
import { sanitize } from 'dompurify';
import User from '@/models/user';
import UserAboutApi from '@/api/user-about-api';

@Component
export default class Presentation extends Vue {
  @Prop({ required: true })
  private user: User | undefined;

  private infos: { icon: string, title: string, value: unknown }[] = [
    {
      icon: 'mdi-account',
      title: 'Nom',
      value: 'Tom',
    },
    {
      icon: 'mdi-cake-variant',
      title: 'Age',
      value: 'Inconnu',
    },
    {
      icon: 'mdi-school',
      title: 'Niveau d\'études',
      value: 'DNB',
    },
  ];

  intro: string | null = null;

  async created(): Promise<void> {
    this.intro = sanitize((await UserAboutApi.getUserIntro(this.user)).text);
  }

  get desktop(): boolean {
    return this.$store.getters['app/isOnDesktop'];
  }

  get markdownIntro(): string {
    return marked(this.intro || '✏️️ Cet utilisateur n\'a pas encore défini sa présentation.');
  }
}
</script>

<style scoped lang="scss">
@use '../../assets/style/colors';

.presentation {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 1rem;

  position: relative;

  overflow: hidden;
  border-radius: .5rem;

  * {
    max-width: 100%;
  }
}

h1 {
  color: white;
  padding-bottom: 1rem;
}

.presentation-text {
  color: white !important;

  * {
    color: white !important;
  }
}

.card {
  background-color: colors.$bg-primary;
  color: white;
  width: 100%;
  padding: 1rem;

  border-radius: .5rem;
}

table {
  width: 100%;

  tbody {
    display: flex;
    flex-direction: column;
    grid-gap: .5rem;
  }

  tr {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-radius: .5rem !important;

    position: relative;
  }

  td {
    padding: .75rem 1rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-overflow-ellipsis: '...';

    margin: 0;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    span {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;

      grid-gap: 1rem;

      font-weight: bolder;
    }
  }

  tr:nth-of-type(odd) {
    background-color: colors.$bg-secondary;
  }

  * {
    color: white;
  }
}

@media screen and (max-width: 960px) {
  .presentation {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 3fr;
  }
}
</style>
