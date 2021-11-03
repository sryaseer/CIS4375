<template>
<validation-observer ref="observer" v-slot="{ invalid }" >
    <div class="ma-5 pa-5">
        <p class = "pageTitle">Student Information</p>
        <v-container class="grey lighten-5">
          <v-row>

            <v-col cols="12" sm="6" md="4">
              <validation-provider v-slot="{ errors }" name="First Name" rules="required|max:20" >
                <v-text-field v-model="firstName" :error-messages="errors" label="First Name" required :disabled="disable"></v-text-field>
              </validation-provider>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <validation-provider v-slot="{ errors }" name="Last Name" rules="required|max:20" >
                <v-text-field v-model="lastName" :error-messages="errors" label="Last Name" required :disabled="disable"></v-text-field>
              </validation-provider>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <validation-provider v-slot="{ errors }" name="Email" rules="required|email" >
                <v-text-field v-model="email" :error-messages="errors" label="Email" required :disabled="disable"></v-text-field>
              </validation-provider>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <validation-provider v-slot="{ errors }" name="Phone" rules="required|digits:10" >
                <v-text-field v-model="phone" :counter="10" :error-messages="errors" label="832-555-0012" required :disabled="disable"></v-text-field>
              </validation-provider>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <validation-provider v-slot="{ errors }" name="dob" rules="required" >
                <v-text-field v-model="dob" :error-messages="errors" label="DOB: MM/DD/YYYY" required :disabled="disable"></v-text-field>
              </validation-provider>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <validation-provider v-slot="{ errors }" name="goal" >
                <v-text-field v-model="goal" label="Fitness Goal" required :disabled="disable"></v-text-field>
              </validation-provider>
            </v-col>


            <v-col cols="12" sm="6" md="4">
              <validation-provider v-slot="{ errors }" name="sport" >
                <v-text-field v-model="sport" label="Sport" required :disabled="disable"></v-text-field>
              </validation-provider>
            </v-col>


            <v-col cols="12" sm="6" md="4">
              <validation-provider v-slot="{ errors }" name="session_credits" rules="required|digits:1" >
                <v-text-field v-model="session_credits" :error-messages="errors" label="Session Credits" required :disabled="disable"></v-text-field>
              </validation-provider>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <validation-provider name="wsd" >
                <v-text-field v-model="waiver_signed_date" label="Waiver: MM/DD/YYYY" disabled></v-text-field>
              </validation-provider>
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
              <v-text-field label="00-00-0000" v-model="dob" solo dense :disabled="disable">
              </v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <p>Sessions</p>
              <v-text-field label=" " solo dense :disabled="disable ">
              </v-text-field>
            </v-col>

          </v-row>
        </v-container>

          <p> {{id}} </p>
          <p> {{msg}} </p>
          <p> {{msg2}} </p>
          <p> {{msg3}} </p>
          <p> {{databaseResponse}} </p>

       <div class="ma-5 pa-5 text-center">
        <v-btn rounded color="primary" dark >
          Submit Changes
        </v-btn>


        <div class="ma-5 pa-5 text-left">
          <v-btn rounded color="primary" dark  @click="enableFields" >
            Edit
          </v-btn>

          <v-btn @click="getStudentInfo" color="primary" dark>
            Get Info
          </v-btn>
        </div>

      </div>

    </div>
  </validation-observer>
</template>




<script>
import AdminService from '@/services/AdminService.js';
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
    data() {
      return{
        id: this.$route.params.id,
        disable: true,
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
        dob: null,
        student_type: null,
        goal: null,
        sport: null,
        sessions_attended: null,
        session_credits: null,
        msg: null,
        msg2: null,
        msg3: null,
        databaseResponse: null,
        //keep on adding your variables
      }
    },
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    methods:{
      enableFields () {
        this.disable = false;   
    }
  },
    async mounted(){
      this.msg2 = "starting";
        try {
          var student_id = this.$route.params.id;
          const response = await AdminService.viewStudent(student_id);
          this.firstName = response.first_name;
          this.lastName = response.last_name;
          this.email = response.email;
          this.dob = new Date(response.dob).toLocaleDateString("en-US");
          this.msg2 = "retrieved data for student!"

        } catch (error) {
          this.msg = error.response.data.msg;
      }
    },
  }
</script>




<style>

.pageTitle {
  text-align: center;
  font-size: 25px;
}


</style>
