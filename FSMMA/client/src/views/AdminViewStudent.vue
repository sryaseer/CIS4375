<template>
<validation-observer ref="observer" v-slot="{ invalid }" >
    <div class="ma-5 pa-5">
        <div class="ma-5 pa-5">
            <h4>Student Information</h4>
        </div>
        <v-container class="grey lighten-5">
          <v-row>

            <v-col cols="12" sm="6" md="4">
              <!-- <p>First Name</p> -->
              <validation-provider v-slot="{ errors }" name="First Name" rules="required|max:20" >
                <v-text-field v-model="firstName" :error-messages="errors" label="First Name" required :disabled="disable"></v-text-field>
              </validation-provider>
              <!--  <v-text-field label="Fname" solo dense :disabled="disable ">
              </v-text-field>
              -->
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <validation-provider v-slot="{ errors }" name="Last Name" rules="required|max:20" >
                <v-text-field v-model="lastName" :error-messages="errors" label="Last Name" required :disabled="disable"></v-text-field>
              </validation-provider>
              <!--
              <p>Last Name</p>
              <v-text-field label="Lname" solo dense :disabled="disable ">
              </v-text-field>
            -->
            </v-col>

            <v-col cols="12" sm="6" md="4">
            <p>Email</p>
              <v-text-field label="@email.com" solo dense :disabled="disable">
              </v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <p>BMI</p>
              <v-text-field label="bmi" solo dense :disabled="disable || i == 0 || i == 4">
              </v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <p>Height</p>
              <v-text-field label="5.9" solo dense :disabled="disable">
              </v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <p>Fat Percent</p>
              <v-text-field label="4%" solo dense :disabled="disable">
              </v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <p>Weight</p>
              <v-text-field label="160 lb" solo dense :disabled="disable">
              </v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <p>Date</p>
              <v-text-field label="00-00-0000" solo dense :disabled="disable">
              </v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <p>Sessions</p>
              <v-text-field label=" " solo dense :disabled="disable ">
              </v-text-field>
            </v-col>

          </v-row>
        </v-container>

       <div class="ma-5 pa-5 text-center">
        <v-btn rounded color="primary" dark>
          Submit Changes
        </v-btn>


        <div class="ma-5 pa-5 text-left">
          <v-btn rounded color="primary" dark  @click="enableFields" >
            Edit
          </v-btn>
        </div>

      </div>

    </div>
  </validation-observer>
</template>




<script>
//for this to work you need to run: npm i vee-validate
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
    name: 'AdminViewStudent',
    data: () => ({
      disable: true,
      firstName: 'John', //you can keep these blank
      lastName: 'Doe',
      email: '',
      //keep on adding your variables
    }),
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    methods:{

      enableFields () {
        this.disable = false;
      }
    },
  }

</script>




<style>



</style>
