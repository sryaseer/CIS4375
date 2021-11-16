<template>
  <validation-observer ref="observer" v-slot="{ invalid }" >
    <v-container>
      <p style="text-align: center; font-size: 18px;"> ADMIN LOGIN </p>
      <v-form @submit.prevent="submit">
      <div id="login-form">

        <validation-provider v-slot="{ errors }" name="email" rules="required|email">
          <v-text-field v-model="email" :error-messages="errors" label="E-mail" required outlined>
          </v-text-field>
        </validation-provider>

        <validation-provider v-slot="{ errors }" name="Password" rules="required|max:24|min:8">
          <v-text-field v-model="password" :error-messages="errors" label="Password" required outlined
                        :type="show1 ? 'text' : 'password'"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="show1 = !show1"></v-text-field>
        </validation-provider>

        <v-col cols="15" md="9">
          <v-btn
          class="mr-4"
          @click="adminLogin" :disabled="invalid">
            log in
          </v-btn>

        <v-btn @click="clear">
          clear
        </v-btn>
        </v-col>

          <p> {{msg}} </p>
        </div>
      </v-form>
    </v-container>
  </validation-observer >
</template>


<script>
import AuthService from '@/services/AuthService.js';
import { required, digits, email, max, regex, between, min } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')
extend('digits', { ...digits, message: '{_field_} needs to be {length} digits. ({_value_})', })
extend('required', {  ...required,  message: '{_field_} can not be empty', })
extend('max', { ...max, message: '{_field_} may not be greater than {length} characters', })
extend('min', { ...min, message: '{_field_} may not be less than {length} characters', })
extend('regex', {  ...regex,  message: '{_field_} {_value_} does not match {regex}', })
extend('email', {...email, message: 'Email must be valid', })
extend('between', {...between, message: '{_field_} is invalid.'})

export default {
  name: 'StudentLogin',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
    email: '',
    password: '',
    show1: false,
    msg: '',
  }
},
  methods: {
    async adminLogin() {
      try {
        const credentials = {
          email: this.email,
          password: this.password
        };
        const response = await AuthService.adminLogin(credentials);
        this.msg = response.msg;

        const adminToken = response.token;
        const admin = response.admin;

        this.$store.dispatch('adminLogin', { adminToken, admin });
        this.$router.push('/admin-home');
    } catch (error) {
        this.msg = error.response.data.msg;
      }
    },
      clear () {
        this.email = ''
        this.password = ''
      },
    },
    beforeMount(){
        this.$store.dispatch('logout');
    }
}

</script>

<style scoped>
#login-form {
  padding-top: 10px;
  margin: auto;
  width: 60%;
}

h3 {
  text-align: center;
}

</style>
