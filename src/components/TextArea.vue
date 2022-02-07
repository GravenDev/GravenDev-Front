<template>
  <div class="input-container" :class="{rounded}">
    <i class="mdi mdi-24px" :class="{[icon]: true}"/>
    <textarea :placeholder="placeholder" v-model="model"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class TextArea extends Vue {
  @Prop({ required: true })
  private placeholder!: string;

  @Prop({ required: false })
  private icon!: string;

  @Prop({ required: false, default: false })
  private rounded!: boolean;

  @Prop({ required: false, default: '' })
  private value!: string;

  get model(): string {
    return this.value;
  }

  set model(value: string) {
    this.$emit('input', value);
  }
}
</script>

<style scoped lang="scss">
@use '../assets/style/colors';

.input-container {
  background-color: colors.$bg-secondary;
  width: 100%;
  padding: 1rem 1rem;
  outline: none;

  display: flex;
  align-items: flex-start;

  border-radius: .5rem;

  &.rounded {
    border-radius: 999rem !important;
  }

  textarea {
    width: 100%;
    min-height: 10rem;
    margin: 0 10px;
    outline: none;
    color: white;

    position: relative;

    &::after {
      content: '';
      width: 2px;
      height: 2px;
      background-color: white;

      right: 0;
      bottom: 0;

      position: absolute;
    }
  }
}
</style>
