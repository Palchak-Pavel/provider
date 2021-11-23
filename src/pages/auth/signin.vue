<template>
  <div>
    <v-card class="text-center pa-1">
      <v-card-title class="justify-center display-1 mb-2">Добро пожаловать</v-card-title>
      <v-card-subtitle>Пожалуйста авторизуйтесь</v-card-subtitle>

      <!-- sign in form -->
      <v-card-text>
        <v-form ref="form" v-model="isFormValid" lazy-validation>
          <v-text-field
            v-model="email"
            :validate-on-blur="false"
            :error="error"
            :label="$t('login.email')"
            name="email"
            outlined
            @keyup.enter="submit"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            :error="error"
            :error-messages="errorMessages"
            :label="$t('login.password')"
            name="password"
            outlined
            @keyup.enter="submit"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-btn
            :loading="isLoading"
            :disabled="isSignInDisabled"
            block
            x-large
            color="primary"
            @click="submit"
          >{{ $t('login.button') }}</v-btn>

<!--          <div class="caption font-weight-bold text-uppercase my-3">{{ $t('login.orsign') }}</div>-->

          <!-- external providers list -->
<!--          <v-btn-->
<!--            v-for="provider in providers"-->
<!--            :key="provider.id"-->
<!--            :loading="provider.isLoading"-->
<!--            :disabled="isSignInDisabled"-->
<!--            class="mb-2 primary lighten-2 primary&#45;&#45;text text&#45;&#45;darken-3"-->
<!--            block-->
<!--            x-large-->
<!--            to="/"-->
<!--          >-->
<!--            <v-icon small left>mdi-{{ provider.id }}</v-icon>-->
<!--            {{ provider.label }}-->
<!--          </v-btn>-->

<!--          <div v-if="errorProvider" class="error&#45;&#45;text">{{ errorProviderMessages }}</div>-->

<!--          <div class="mt-5">-->
<!--            <router-link :to="localePath('/auth/forgot-password')">-->
<!--              {{ $t('login.forgot') }}-->
<!--            </router-link>-->
<!--          </div>-->
        </v-form>
      </v-card-text>
    </v-card>

<!--    <div class="text-center mt-6">-->
<!--      {{ $t('login.noaccount') }}-->
<!--      <router-link :to="localePath('/auth/signup')" class="font-weight-bold">-->
<!--        {{ $t('login.create') }}-->
<!--      </router-link>-->
<!--    </div>-->
  </div>
</template>

<script>
/*
|---------------------------------------------------------------------
| Sign In Page Component
|---------------------------------------------------------------------
|
| Sign in template for user authentication into the application
|
*/
import { mapGetters } from 'vuex';
export default {
  layout: 'auth',
  data() {
    return {
      // sign in buttons
      isLoading: false,
      isSignInDisabled: false,

      // form
      isFormValid: true,
      email: '',
      password: '',

      // form error
      error: false,
      errorMessages: '',

      errorProvider: false,
      errorProviderMessages: '',

      // // show password field
      showPassword: false,
    }
  },

  methods: {
    async submit() {
         try {
            await this.$auth.loginWith("local", {
               data: {
                  login: this.email,
                  password: this.password
               }
            });
         }catch (error) {
            console.log(error);
         }

      }
    },

    signIn(email, password) {
      this.$router.push('/')
    },
    signInProvider(provider) {},
    resetErrors() {
      this.error = false
      this.errorMessages = ''
      this.errorProvider = false
      this.errorProviderMessages = ''
    }
  }

</script>
