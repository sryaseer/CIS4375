<template>
  <validation-observer ref="observer" v-slot="{ invalid }" >

    <div id="form-div">
      <p style="text-align: center; font-size: 28px;"> Create Instructor Account </p>
      <form @submit.prevent="submit" id="instructorForm">

        <validation-provider v-slot="{ errors }" name="First Name" rules="required|max:20" >
          <v-text-field v-model="firstName" :error-messages="errors" label="First Name" required outlined></v-text-field>
        </validation-provider>

        <validation-provider v-slot="{ errors }" name="Last Name" rules="required|max:20" >
          <v-text-field v-model="lastName" :error-messages="errors" label="Last Name" required outlined></v-text-field>
        </validation-provider>

        <validation-provider v-slot="{ errors }" name="email" rules="required|email">
          <v-text-field v-model="email" :error-messages="errors" label="E-mail" required outlined hint="This will be your username to log in.">
          </v-text-field>
        </validation-provider>

        <validation-provider v-slot="{ errors }" name="title" rules="required|email">
          <v-text-field v-model="title" :error-messages="errors" label="Title" required outlined>
          </v-text-field>
        </validation-provider>

         <validation-provider v-slot="{ errors }" name="rate" rules="required|number">
          <v-text-field type="number" v-model="rate" :error-messages="errors" label="Rate per session" required outlined>
          </v-text-field>
        </validation-provider>

          <v-select
            :items="locations"
            v-model="location"
            filled
            label="Location"
            :disabled="disable"
          ></v-select>

        <validation-provider v-slot="{ errors }" name="Password" rules="required|max:24|min:8">
          <v-text-field v-model="password" :error-messages="errors" label="Password" required outlined
                        :type="show1 ? 'text' : 'password'"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="show1 = !show1"></v-text-field>
        </validation-provider>

        <br><br>

        <validation-provider v-slot="{ errors }" name="Phone Number" :rules="{ required: true, digits: 10}">
          <v-text-field v-model="phoneNumber" :counter="10" :error-messages="errors" label="Phone Number" required outlined>
          </v-text-field>
        </validation-provider>
            

        <p>{{ msg }}</p>
        <div>
          <v-btn style="margin: 5px" class="btn" @click="submit" :disabled="invalid">
            submit
          </v-btn>
          <v-btn style="margin: 5px" class="btn" @click="clear">
            clear
          </v-btn>
        </div>

      </form>
    </div>
    

  </validation-observer>
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
  name: 'InstructorCreateAccount',
  components: {
      ValidationProvider,
      ValidationObserver,
    },
  data() {
      return {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      phoneNumber: null,
      title: null,
      show1: false,
      msg: '',
      msg2: '',
      locations: ['Katy', 'Houston'],
      location: null
    }
  },

    methods: {
      async submit(){
        try {
          const credentials = {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            password: this.password,
            phone: this.phoneNumber,
          };
        } catch (error) {
          this.msg = error.response.data.msg;
        }
      },
      clear() {
        this.firstName = null;
        this.lastName= null;
        this.email= null;
        this.password= null;
        this.phoneNumber= null;
        this.select= null;
      },

    },
    async mounted() {

    },
}

</script>

<style>
  #form-div {
    padding-top: 10px;
    padding-bottom: 60px;
    width: 100%;
  }
  #instructorForm {
    padding-bottom: 10px;
    margin-left: auto;
    margin-right: auto;
    max-width: 550px;
    width: 70%;
  }
  .dateForm {
    display: table;
  }
  .dateFormItem{
    display: table-cell;
    padding-right: 10px;
  }

  .v-input {
    transform: scale(0.875);
    padding: 0px;
    margin: 0px;
}

  .v-text-field__details {
    display: none;
  }

  .col-sm-6 {
    margin: 2px;
    padding: 0px
  }
</style>
