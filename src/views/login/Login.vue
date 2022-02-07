<template>
  <div class="login-container">
    <div class="login-card">
      <h1>Se connecter avec :</h1>
      <div class="btns">
        <a
          :href="loginUrl"
          class="bg-blurple">
          <i class="mdi mdi-discord"></i>
          Discord
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  private scope = 'identify email connections guilds.members.read';

  private redirectUrl: string = process.env.NODE_ENV === 'development'
    ? 'https://phpstorm-a-preview.ftmnet.com/login/callback'
    : 'https://graven-dev-dev.ftmnet.com/login/callback';

  private loginUrl = `https://discord.com/api/oauth2/authorize?client_id=807364896916242497&redirect_uri=${this.redirectUrl}&response_type=code&scope=${this.scope}`;

  async created(): Promise<void> {
    await this.$store.dispatch('app/loaded');
  }
}
</script>

<style scoped lang="scss">
@use '../../assets/style/colors';

// create a centered login card on the login container
.login-container {
  min-width: 100%;
  min-height: 100%;

  background-image: url('/img/bg.png');
  background-size: cover;
  background-repeat: no-repeat;

  display: flex;
  justify-content: center;
  align-items: center;

  .login-card {
    width: 50%;

    padding: 2rem;

    background-color: colors.$bg-primary;
    color: white;

    border-radius: .5rem;

    .btns {
      width: 100%;
      padding: 1rem 0 0;

      display: flex;

      .bg-blurple {
        $blurple: #5865F2;
        background-color: $blurple;

        &:hover {
          background-color: darken($blurple, 5%);
        }

        &:active {
          box-shadow: 0 0 5px colors.$bg-primary inset;
        }
      }

      a {
        width: 100%;
        padding: 1rem;

        display: flex;
        grid-gap: 1rem;

        text-decoration: none;

        border-radius: 4px;

        font-size: 20px;

        color: white;
      }
    }
  }
}

@media screen and (max-width: 960px) {
  .login-container {
    .login-card {
      width: 75%;
    }
  }
}

@media screen and (max-width: 600px) {
  .login-container {
    .login-card {
      width: 90%;
    }
  }
}

@media screen and (max-width: 400px) {
  .login-container {
    .login-card {
      h1 {
        font-size: 1.5rem;
      }
    }
  }
}
</style>
