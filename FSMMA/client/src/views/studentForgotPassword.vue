<template>
  <validation-observer ref="observer" v-slot="{ invalid }" >
    <v-container style="max-width: 400px; margin: auto; margin-top: 100px">
      <p style="text-align: center; font-size: 28px;"> Forgot Password </p>
      <v-form>
        <validation-provider v-slot="{ errors }" name="email" rules="required|email">
          <v-text-field v-model="email" :error-messages="errors" label="E-mail" required outlined>
          </v-text-field>
        </validation-provider>
        <p> {{msg}} </p>
        <v-btn class="mr-4" @click="resetPassword"> Send Email </v-btn>
      </v-form>
    </v-container>
  </validation-observer >
</template>

<script>
import AuthService from '@/services/AuthService.js';
import MailService from '@/services/MailService.js';
import { required, digits, email, max, regex, between, min } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import axios from 'axios'

setInteractionMode('eager')
extend('email', {...email, message: 'Email must be valid', })


export default {
  name: 'StudentForgotPassword',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
        email: null,
        show1: false,
        msg: null,
      }
  },
  methods: {
    async resetPassword() {
      this.msg = null,
      console.log("clicked")
      try {
        const credentials = {
          email: this.email,
        };

        let response = await MailService.forgotPassword(credentials);
        console.log(response.data)
        this.msg = "Email was sent. Please check spam folder as well."
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    }
  },
  beforeMount(){
        this.$store.dispatch('logout');
    },
}

</script>



<style scoped>

#login-form {
  padding-top: 10px;
  margin: auto;
  width: 60%;
}
</style>
