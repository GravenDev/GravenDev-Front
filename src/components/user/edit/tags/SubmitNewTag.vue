<template>
  <!--<v-card flat outlined elevation="2">
    <v-card-title>
      Vous ne trouvez pas votre bonheur ? Proposez votre tag :
    </v-card-title>
    <v-card-subtitle>
      <v-alert class="mt-4"
               type="warning"
               elevation="12"
               close-icon="mdi-close" dismissible
               prominent outlined dense>
        Tout abus sera sanctionné. <br/>
        Vous avez un doute ? Vérifiez sur la <a href="/">charte des tags</a>.
      </v-alert>
    </v-card-subtitle>

    <div class="card-content pl-4 pr-4">
      <v-form v-model="valid"
              lazy-validation
              ref="form">
        <v-text-field
          v-model="tagName"
          filled dense
          color="green"
          :rules="tagNameRules"
          placeholder="Nom"
          prepend-icon="mdi-tag-plus"/>
        <v-text-field
          v-model="tagIcon"
          filled dense
          color="green"
          :rules="tagIconRules"
          placeholder="Icone (optionel)"
          prepend-icon="mdi-image"/>

      </v-form>
    </div>

    <div class="alerts">
      <v-alert v-model="successSnackbar"
               timeout="3000"
               transition="fade"
               outlined dark
               color="green">
        Tags soumis !
      </v-alert>

      <v-alert v-model="errorSnackbar"
               timeout="3000"
               outlined dark
               type="error">
        Erreur lors de l'enregistrement des tags !
      </v-alert>
    </div>
    <v-card-actions>
      <v-btn text color="green" @click="sendSuggestion()">
        <v-icon left>
          mdi-send
        </v-icon>
        Proposer
      </v-btn>
    </v-card-actions>
  </v-card>-->
  <div class="submit-new-tag">
    <h1>Proposez votre tag :</h1>
    <h3>
      Il vous manque un tag ? Proposez le !
    </h3>

    <div class="alert info">
      <div class="icon">
        <i class="mdi mdi-information-outline"/>
      </div>
      <div class="txt">
        <p>
          Tout abus sera sanctionné. <br/>
          Vous avez un doute ? Vérifiez sur la <a href="/">charte des tags</a>.
        </p>
      </div>
    </div>

    <form class="form" @submit="sendSuggestion" ref="form">
      <Input icon="mdi-tag" placeholder="Nom du tag *" v-model="tagName" required/>
      <Input icon="mdi-image" placeholder="Icone du tag" v-model="tagIcon"/>
      <button class="btn" type="submit">
        <i class="mdi mdi-send"/>
        Proposer
      </button>
    </form>

    <div class="alerts">
      <div class="alert success" v-if="successSnackbar">
        <div class="icon">
          <i class="mdi mdi-check"/>
        </div>
        <div class="txt">
          Tags soumis
        </div>
      </div>
      <div class="alert error" v-if="errorSnackbar">
        <div class="icon">
          <i class="mdi mdi-alert-circle"/>
        </div>
        <div class="txt">
          Erreur lors de l'envoi de la suggestion :
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
import UserTagApi from '@/api/user-tag-api';
import { TagSuggestion } from '@/models/tag';
import Input from '@/components/Input.vue';

@Component({
  components: { Input },
})
export default class SubmitNewTag extends Vue {
  $refs !: {
    form: HTMLFormElement
  };

  private tagName = '';

  private tagIcon = '';

  private successSnackbar = false;

  private errorSnackbar = false;

  private errors: string[] = [];

  get authToken(): string {
    return this.$store.getters['app/getAuthToken'];
  }

  async sendSuggestion(e: any): Promise<void> {
    e.preventDefault();

    this.errors = [];

    if (!this.tagName) {
      this.errors.push('Le nom du tag est obligatoire');
    }

    if (this.tagIcon && !this.tagIcon.startsWith('mdi-')) {
      this.errors.push('Les noms d\'icone doivent commencer par "mdi-"');
    }

    this.errorSnackbar = this.errors.length > 0;
    if (this.errorSnackbar) return;

    const tag: TagSuggestion = {
      name: this.tagName,
    };

    if (this.tagIcon) tag.icon = this.tagIcon;

    const result = await UserTagApi.addSuggestion(this.authToken, tag);

    if (!result) {
      this.errors.push('Une erreur lors de la communication avec le serveur s\'est produite');
    }

    this[result ? 'successSnackbar' : 'errorSnackbar'] = true;
    if (this.successSnackbar) {
      this.$refs.form.reset();
      this.tagName = '';
      this.tagIcon = '';
    }
  }

  @Watch('successSnackbar')
  watchSuccessSnackbar(newValue: boolean): void {
    this.errorSnackbar = false;
    if (newValue) {
      setTimeout((): void => {
        this.successSnackbar = false;
      }, 5000);
    }
  }

  @Watch('errorSnackbar')
  watchErrorSnackbar(): void {
    this.successSnackbar = false;
  }
}
</script>

<style scoped lang="scss">
@use '../../../../assets/style/colors';

.submit-new-tag {
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

button {
  background-color: colors.$green;

  &:hover {
    background-color: darken(colors.$green, 10%) !important;
  }
}
</style>
