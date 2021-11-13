<template>
  <div class="ma-5 pa-5">
        <p class = "pageTitle">Admin View/Edit Instructor</p>
        <v-container class="container1">
          <v-row>
            <v-col cols="12" md="4">
                <v-text-field
                  v-model="firstName"
                  label="First Name"
                  outlined
                  :disabled="disable"
                ></v-text-field>
              </v-col>
            <v-col cols="12" md="4">
                <v-text-field
                  v-model="lastName"
                  label="Last Name"
                  outlined
                  :disabled="disable"
                ></v-text-field>
              </v-col>
            <v-col cols="12" md="4">
                <v-text-field
                  v-model="email"
                  label="Email"
                  outlined
                  :disabled="disable"
                ></v-text-field>
              </v-col>
            <v-col cols="12" md="4">
                <v-text-field
                  v-model="phone"
                  label="Phone"
                  outlined
                  :disabled="disable"
                ></v-text-field>
              </v-col>
            <v-col cols="12" md="4">
                <v-text-field
                  v-model="title"
                  label="Title"
                  outlined
                  :disabled="disable"
                ></v-text-field>
              </v-col>

            <v-col class="d-flex" cols="12" sm="6">
              <v-select
                :items="statuses"
                v-model="status"
                filled
                label="Status"
                :disabled="disable"
              ></v-select>
            </v-col>

            <v-col class="d-flex" cols="12" sm="6">
              <v-select
                :items="locations"
                v-model="location"
                filled
                label="Location"
                :disabled="disable"
              ></v-select>
            </v-col>

            <v-col cols="12" md="4">
                <v-text-field
                  v-model="ratePerSession"
                  label="Rate per session"
                  outlined
                  :disabled="disable"
                ></v-text-field>
              </v-col>

            <v-col cols="12" md="4">
                <v-text-field
                  v-model="account_created_date"
                  label="Start Date"
                  outlined
                  :disabled="disable"
                ></v-text-field>
              </v-col>
          </v-row>

          <div>
            <v-btn class="btn" dark  @click="enableFields" > Edit </v-btn> &nbsp;
            <v-btn class="btn" id="submitbtn" @click="submitChanges" dark> Submit Changes </v-btn>
          </div>
        </v-container>
      </div>
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
    name: 'AdminViewInstructor',
    data() {
      return{
        instructor_id: this.$route.params.id,
        disable: true,
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        phone: null,
        statuses: ['active', 'inactive'],
        locations: ['Katy', 'Houston'],
        admin_id: null,
        location_id: null,
        instructor_status_id: null,
        account_created_date: null,
        msg: null,
        status: null,
        location: null,
        ratePerSession: null,
      }
    },
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    async mounted(){
        try {
          const response = await AdminService.viewInstructor(this.instructor_id);
          console.log(response)
          this.firstName = response.first_name;
          this.lastName = response.last_name;
          this.email = response.email;
          this.phone = response.phone;
          this.title = response.title;
          this.ratePerSession = response.rate_per_session
          this.account_created_date = new Date(response.account_created_date).toLocaleDateString("en-US");
        } catch (error) {
          this.msg = error.response.data.msg;
      }
    },
    methods:{
      logout() {
        this.$store.dispatch('logout');
        this.$router.push('/admin-login');
      },
      enableFields () {
        if (this.disable == true) {this.disable = false; }
        else if (this.disable == false) {this.disable = true; }
      },
      enableHealthFields(){
        if (this.disableHealth == true) {this.disableHealth = false; }
        else if (this.disableHealth == false) {this.disableHealth = true; }
      },
      submitChanges(){

      },
      submitHealthEntry(){

      },
      addCredits(){

      },
      signUpForSession(){

      },
      addNotes(){

      },
    },
    async created() {
      if (!this.$store.getters.isAdminLoggedIn) {
          this.$router.push('/admin-login');
      }
    },
  }
</script>





<style>
#studentSearch{
  max-width: 70%;
  min-width: 60%;
  margin: auto;
}
.pageTitle {
  text-align: center;
  font-size: 25px;
}
</style>
