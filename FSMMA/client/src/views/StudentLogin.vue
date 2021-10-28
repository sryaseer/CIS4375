<template>
  <v-container>
    <v-form v-model="valid" @submit.prevent="submit">
    <br></br>
    <p style="text-align: center; font-size: 28px;"> Student Login Page </p>
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
        type="submit"
        :disabled="invalid">
          submit
        </v-btn>

      <v-btn @click="clear">
        clear
      </v-btn>
      </v-col>

        <br>
        <p style="text-align: center;"> New student? Make your account <a href="/createstudentaccount"> here! </a> </p>
      </div>
    </v-form>
  </v-container>
</template>

<script>
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
  data: () => ({
    email: '',
    password: '',
    show1: false,
  }),
  methods: {
      submit () {
      },
      clear () {
        this.email = ''
        this.password = ''
      },
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
