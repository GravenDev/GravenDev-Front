<template>
  <div class="intro-edit">
    <h1>Modifiez votre présentation :</h1>

    <div class="alert info">
      <div class="icon">
        <i class="mdi mdi-information-outline"/>
      </div>
      <div class="txt">
        <span>
          Vous devez utiliser le
          <a href="https://github.com/leebyron/spec-md/blob/main/spec/Markdown.md"
             class="white--text"
             target="_blank">markdown</a>
          dans votre présentation
        </span>
      </div>
    </div>

    <form @submit="saveIntro">
      <TextArea v-model="intro"
                placeholder="Votre présentation"
                icon="mdi-presentation"/>
      <button type="submit" class="btn">
        <i class="mdi mdi-floppy"/>
        Enregistrer
      </button>
    </form>

    <div class="alerts">
      <div class="alert success" v-if="successSnackbar">
        <div class="icon">
          <i class="mdi mdi-check"/>
        </div>
        <div class="txt">
          Introduction modifiée avec succès
        </div>
      </div>
      <div class="alert error" v-if="errorSnackbar">
        <div class="icon">
          <i class="mdi mdi-alert-circle"/>
        </div>
        <div class="txt">
          Erreur lors de l'enregistrement de l'introduction :
          <ul>
            <li v-for="error in errors" :key="error">
              {{ error }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { sanitize } from 'dompurify';
import UserAboutApi from '@/api/user-about-api';
import User from '@/models/user';
import TextArea from '@/components/TextArea.vue';

@Component({
  components: { TextArea },
})
export default class IntroEdit extends Vue {
  private successSnackbar = false;

  private errorSnackbar = false;

  private intro = '';

  private errors: string[] = [];

  @Watch('successSnackbar')
  watchSuccessSnackbar(newValue: boolean): void {
    this.errorSnackbar = false;
    if (newValue) {
      setTimeout(() => {
        this.successSnackbar = false;
      }, 5000);
    }
  }

  @Watch('errorSnackbar')
  watchErrorSnackbar(): void {
    this.successSnackbar = false;
  }

  get authToken(): string {
    return this.$store.getters['app/getAuthToken'];
  }

  get currentUser(): User {
    return this.$store.getters['user/getCurrentUser'];
  }

  async created(): Promise<void> {
    this.intro = (await UserAboutApi.getUserIntro(this.currentUser)).text;

    await this.$store.dispatch('app/loaded');
  }

  async saveIntro(e: any): Promise<void> {
    e.preventDefault();

    const saved = await UserAboutApi.updateUserIntro(
      this.authToken,
      this.currentUser,
      {
        text: sanitize(this.intro),
      },
    );

    if (!saved) {
      this.errors.push('Une erreur lors de la communication avec le serveur s\'est produite');
    }

    this[saved ? 'successSnackbar' : 'errorSnackbar'] = true;
  }
}
</script>

<style scoped lang="scss">
@use '../../../../assets/style/colors';

.intro-edit {
  padding: 1rem;

  background-color: colors.$bg-primary;
  border-radius: .5rem;

  form {
    padding: 1rem 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    grid-gap: .5rem;
  }
}

button.btn {
  background-color: colors.$success;

  &:hover {
    background-color: darken(colors.$success, 10%);
  }

  &:active {
    background-color: darken(colors.$success, 5%);
  }
}
</style>
