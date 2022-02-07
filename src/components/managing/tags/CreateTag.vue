<template>
  <div class="create-tag">
    <h2>Création d'un nouveau tag :</h2>
    <form class="form" @submit.prevent="sendTag">
      <Input icon="mdi-tag" placeholder="Nom du tag *" v-model="tagName" required/>
      <Input icon="mdi-image" placeholder="Icone du tag *" v-model="tagIcon" required/>
      <Input icon="mdi-palette"
             placeholder="Couleur du tag"
             v-model="tagColor"
             type="color"
             default="#ffffff"/>
      <div class="preview">
        <span>Aperçu : </span>
        <Tag :rounded="true"
             :color="tagColor.replace('#', '')"
             v-if="tagColor.toLowerCase() !== '#ffffff'">
          <i class="mdi" :class="tagIcon"></i>
          {{ tagName }}
        </Tag>
        <Tag :rounded="true" v-else>
          <i class="mdi" :class="tagIcon"></i>
          {{ tagName }}
        </Tag>
      </div>
      <div class="btns">
        <button class="btn" type="submit">
          <i class="mdi mdi-send"/>
          Proposer
        </button>
        <button class="btn cancel" @click="reset">
          <i class="mdi mdi-rotate-left"/>
          Remise à zéro
        </button>
      </div>
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
import { Component } from 'vue-property-decorator';
import Input from '@/components/Input.vue';
import EventBus from '@/services/event-bus';
import PendingTag from '@/models/pending-tag';
import Tag from '@/components/Tag.vue';

@Component({
  components: {
    Tag,
    Input,
  },
})
export default class CreateTag extends Vue {
  private tagName = '';

  private tagIcon = '';

  private tagColor = '#ffffff';

  private successSnackbar = false;

  private errorSnackbar = false;

  private errors: string[] = [];

  mounted(): void {
    EventBus.$on('fill-tag-form', this.fill);
  }

  // eslint-disable-next-line class-methods-use-this
  destroyed(): void {
    EventBus.$off('fill-tag-form');
  }

  fill(tag: PendingTag): void {
    this.tagName = tag.name;
    this.tagIcon = tag.icon ?? '';
    this.tagColor = '#ffffff';
  }

  reset(): void {
    this.tagColor = '#ffffff';
    this.tagName = '';
    this.tagIcon = '';
  }

  sendTag(): void {
    console.log(this.tagColor);
  }
}
</script>

<style scoped lang="scss">
@use '../../../assets/style/colors';

.create-tag {
  padding: 1rem;

  background-color: colors.$bg-primary;
  border-radius: .5rem;

  position: sticky;
  top: 85px;

  form {
    padding: 1rem 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    grid-gap: .5rem;
  }

  .preview {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    justify-self: flex-start;

    color: white;

    width: 100%;

    grid-gap: 1rem;
  }
}

.btns {
  display: grid;
  grid-template-columns: 4fr 3fr;
  grid-gap: .5rem;

  width: 100%;
}

button {
  background-color: colors.$green;

  &:hover {
    background-color: darken(colors.$green, 10%) !important;
  }

  &.cancel {
    background-color: colors.$red;

    &:hover {
      background-color: darken(colors.$red, 10%) !important;
    }
  }
}
</style>
