<template>
<validation-observer ref="observer" v-slot="{ invalid }" >
    <v-container>
      <p style="text-align: center; font-size: 18px;">STUDENT INFORMATION</p>


        <!-- START STUDENT CONTACT CONTAINER -->
        <v-container class="container1">
          <!-- CONTACT ROW -->
          <v-row>

            <v-col cols="12" sm="12" md="12">
              <p class="rowSubTitle"> Personal Info: </p>
            </v-col>

            <v-col cols="6" lg="4" sm="4" md="4">
              <validation-provider v-slot="{ errors }" name="First Name" rules="required|max:20" >
                <v-text-field v-model="firstName" :error-messages="errors" label="First Name" outlined required :disabled="disable"></v-text-field>
              </validation-provider>
            </v-col>

            <v-col cols="6" sm="4" md="4">
              <validation-provider v-slot="{ errors }" name="Last Name" rules="required|max:20" >
                <v-text-field v-model="lastName" :error-messages="errors" label="Last Name" outlined required :disabled="disable"></v-text-field>
              </validation-provider>
            </v-col>

            <v-col cols="6" sm="4" md="4">
              <validation-provider v-slot="{ errors }" name="Email" rules="required|email" >
                <v-text-field v-model="email" :error-messages="errors" label="Email" outlined required :disabled="disable"></v-text-field>
              </validation-provider>
            </v-col>

            <v-col cols="6" sm="4" md="4">
              <validation-provider v-slot="{ errors }" name="Phone" rules="required|digits:10" >
                <v-text-field v-model="phone" :counter="10" :error-messages="errors" label="Phone (832-555-0000)" outlined required :disabled="disable"></v-text-field>
              </validation-provider>
            </v-col>

            <v-col cols="12" sm="4" md="4">
              <validation-provider name="wsd" >
                <v-text-field v-model="waiver_signed_date" outlined label="Waiver Signature Date" disabled></v-text-field>
              </validation-provider>
            </v-col>
          </v-row>
          <!-- END OF CONTACT ROW -->

          <!-- ADDRESS ROW -->
          <v-row>

            <v-col cols="12" sm="12" md="12">
              <p class="rowSubTitle"> Student Address: </p>
            </v-col>

              <v-col cols="6" sm="6" md="4">
                <validation-provider v-slot="{ errors }" name="address" >
                  <v-text-field v-model="address" label="Address" outlined required :disabled="disable"></v-text-field>
                </validation-provider>
              </v-col>

              <v-col cols="6" sm="6" md="4">
                <validation-provider v-slot="{ errors }" name="city" >
                  <v-text-field v-model="city" label="City" outlined required :disabled="disable"></v-text-field>
                </validation-provider>
              </v-col>

              <v-col cols="6" sm="6" md="4">
                <validation-provider v-slot="{ errors }" name="state" >
                  <v-text-field v-model="state" label="State" outlined required :disabled="disable"></v-text-field>
                </validation-provider>
              </v-col>

              <v-col cols="6" sm="6" md="4">
                <validation-provider v-slot="{ errors }" name="zip" >
                  <v-text-field v-model="zip" label="Zip" outlined required :disabled="disable"></v-text-field>
                </validation-provider>
              </v-col>
            </v-row>
            <!-- END OF ADDRESS ROW -->

            <!-- SPORT ROW -->
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <validation-provider v-slot="{ errors }" name="student_type" >
                <v-text-field v-model="student_type" label="Student Type" outlined required :disabled="disable"></v-text-field>
              </validation-provider>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <validation-provider v-slot="{ errors }" name="goal" >
                <v-text-field v-model="goal" label="Fitness Goal" outlined required :disabled="disable"></v-text-field>
              </validation-provider>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <validation-provider v-slot="{ errors }" name="sport" >
                <v-text-field v-model="sport" label="Sport" outlined required :disabled="disable"></v-text-field>
              </validation-provider>
            </v-col>
          </v-row>
          <!-- END OF SPORT ROW -->
          <div>
            <v-btn class="btn" dark  @click="enableFields" > Edit </v-btn>
            <v-btn class="btn" id="submitbtn" @click="submitContactChanges" dark> Submit Changes </v-btn>
          </div>
        </v-container>
        <!-- END OF STUDENT CONTACT CONTAINER -->

        <!-- STUDENT SESSIONS CONTAINER -->
        <v-container class="container1">
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <p class="rowSubTitle"> Sessions: </p>
            </v-col>

            <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="account_created_date" label="Account Created Date" disabled></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="sessions_attended" label="Sessions Attended" disabled></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="session_credits" label="Session Credits" disabled></v-text-field>
            </v-col>
          </v-row>
          <div>
            <v-btn class="btn" dark href="student-buy-session" > Add Credits </v-btn>
          </div>
        </v-container>
        <!-- END OF STUDENT SESSIONS CONTAINER -->

        <!-- Change Password -->
        <v-container class="container1">
          <v-row>
            <v-col cols="12" >
              <p class="rowSubTitle"> Change Password: </p>
            </v-col>
            <v-col cols="12" sm="6" md="5">
                <v-text-field class="changePassField" type="password" v-model="form.password" label="New Password" outlined required></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="5">
                <v-text-field class="changePassField" type="password" v-model="form.confirmPassword" label="Confirm Password" outlined required></v-text-field>
            </v-col>
          </v-row>
          <p> {{form.error}} </p>
          <div>
            <v-btn class="btn" dark @click="changePassword" > Change password </v-btn>
          </div>
        </v-container>

          <p> {{student_id}} </p>
          <p> {{error}} </p>
          <p> {{msg3}} </p>
          <p> {{databaseResponse}} </p>


      </v-container>

  </validation-observer>
</template>




<script>
import AdminService from '@/services/AdminService.js';
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
    name: 'AdminViewStudent',
    data() {
      return{
        form: {
            password: '',
            confirmPassword: ''
        },
        disable: true,
        disableHealth: true,
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
        dob: null,
        address: null,
        city: null,
        state: null,
        zip: null,
        student_type: null,
        goal: null,
        sport: null,
        account_created_date: null,
        sessions_attended: null,
        session_credits: null,
        waiver_signed_date: null,
        bmi: null,
        date: null,
        weight: null,
        height: null,
        fat: null,
        msg: null,
        msg2: null,
        msg3: null,
        databaseResponse: null,
        //keep on adding your variables
        admin_id: null,
      }
    },
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    created() {
      if (!this.$store.getters.isLoggedIn) {
        this.$router.push('/student-login');
      }
      else {
        this.student_id = this.$store.getters.getUser.student_id;
      }
    },
    async mounted(){
        try {
          const response = await AdminService.viewStudent(this.student_id);
          this.firstName = response.first_name;
          this.lastName = response.last_name;
          this.email = response.email;
          this.dob = new Date(response.dob).toLocaleDateString("en-US");
          this.address = response.address;
          this.city = response.city;
          this.state = response.state;
          this.zip = response.postal_code;
          this.waiver_signed_date = new Date(response.waiver_signed_date).toLocaleDateString("en-US");
          this.account_created_date = new Date(response.account_created_date).toLocaleDateString("en-US");
          this.session_credits = response.session_credits;
          this.phone = response.phone;

        } catch (error) {
          this.msg = error.response.data.msg;
      }
    },
    methods:{
      logout() {
        this.$store.dispatch('logout');
        this.$router.push('/adminlogin');
      },
      enableFields () {
        if (this.disable == true) {this.disable = false; }
        else if (this.disable == false) {this.disable = true; }
      },
      enableHealthFields(){
        if (this.disableHealth == true) {this.disableHealth = false; }
        else if (this.disableHealth == false) {this.disableHealth = true; }
      },
      submitContactChanges(){

      },
      submitHealthEntry(){

      },
      addCredits(){

      },
      signUpForSession(){

      },
      addNotes(){

      },
      async changePassword(){
          let id = this.$store.getters.getUser.student_id;
          if(this.form.password !== this.form.confirmPassword){
              alert('Password do not match')
              return
          }
          let result = await AuthService.changePassword({...this.form, id: id})
          if(result){
            alert('Password changed')
          }
      },
    },
  }
</script>




<style scoped>
.pageTitle {
  text-align: center;
  font-size: 25px;
}

.rowSubTitle{
  font-size: 18px;
}

.btn {
  margin-right: 10px;
  margin-bottom: 20px;
}

.container1{
  background-color: #f7f8f8;
  margin-bottom: 50px;
}


</style>
