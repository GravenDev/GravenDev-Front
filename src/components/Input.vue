<template>
  <div class="input-container" :class="{rounded}">
    <i class="mdi mdi-24px" :class="{[icon]: true}"/>
    <input :placeholder="placeholder"
           v-model="model"
           :type="type"
           ref="input"
           @reset="this.$emit('input', '')"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Ref } from 'vue-property-decorator';

@Component
export default class Input extends Vue {
  @Prop({ required: true })
  private placeholder!: string;

  @Prop({ required: false })
  private icon!: string;

  @Prop({
    required: false,
    default: false,
  })
  private rounded!: boolean;

  @Prop({
    required: false,
    default: '',
  })
  private value!: string;

  @Prop({
    required: false,
    default: 'text',
  })
  private type!: string;

  @Prop({
    required: false,
    default: '',
  })
  private default!: string;

  @Ref('input')
  private input!: HTMLInputElement;

  mounted(): void {
    this.input.defaultValue = this.default;
  }

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
  height: 3rem;
  padding: .75rem 1rem;
  outline: none;

  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-gap: .5rem;

  border-radius: .5rem;

  color: white;

  &.rounded {
    border-radius: 999rem !important;
  }

  input {
    width: 100%;
    height: 2rem;

    border: none;
    outline: none;
    color: white;

    &[type="color"]::-webkit-color-swatch-wrapper {
      padding: 0;
    }

    &[type="color"]::-webkit-color-swatch {
      border: none;
      border-radius: 999rem;
    }

    &[type="color"]::-moz-color-swatch {
      border: none;
      border-radius: 999rem;
    }
  }
}
</style>
