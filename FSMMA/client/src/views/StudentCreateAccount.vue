<template>
  <validation-observer ref="observer" v-slot="{ invalid }" >

    <div id="form-div">
      <p style="text-align: center; font-size: 18px;"> CREATE STUDENT ACCOUNT </p>
      <form @submit.prevent="submit" id="studentForm">

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

        <div class="dateForm">
          <div class="dateFormItem" style="min-width: 105px; width: 80px;">
            <p>DOB:</p>
          </div>
          <div class="dateFormItem" style="min-width: 60px; width: 100px;">
            <validation-provider v-slot="{ errors }" name="Day" rules="required|digits:2|between:1,31">
              <v-text-field v-model="day" :error-messages="errors" label="DD" required outlined>
              </v-text-field>
            </validation-provider>
          </div>
          <div class="dateFormItem" style="min-width: 60px; width: 100px;">
            <validation-provider v-slot="{ errors }" name="Month" rules="required|digits:2|between:1,12" >
              <v-text-field v-model="month" :error-messages="errors" label="MM" required outlined>
              </v-text-field>
            </validation-provider>
          </div>
          <div class="dateFormItem" style="min-width: 85px; width: 320px;">
            <validation-provider v-slot="{ errors }" name="Year" rules="required|digits:4|between:1900,2021">
              <v-text-field v-model="year" :error-messages="errors" label="YYYY" required outlined>
              </v-text-field>
            </validation-provider>
          </div>
        </div>

        <validation-provider v-slot="{ errors }" name="Address" rules="min:8">
          <v-text-field v-model="address" :error-messages="errors" label="Street Address" required outlined>
          </v-text-field>
        </validation-provider>

        <div class="addressForm">
          <div class="addressFormItem" style="padding-right: 10px; min-width: 120px; width: 460px;">
            <validation-provider v-slot="{ errors }" name="City" rules="max:30">
              <v-text-field v-model="city" :error-messages="errors" label="City" required outlined>
              </v-text-field>
            </validation-provider>
          </div>
          <div class="addressFormItem" style="padding-right: 10px; width: 200px; min-width: 80px;">
            <validation-provider v-slot="{ errors }" name="State" rules="max:2">
              <v-select v-model="state" :items="states" :error-messages="errors" label="State" data-vv-name="state" required outlined>
              </v-select>
            </validation-provider>
          </div>
          <div class="addressFormItem" style="min-width: 100px; width: 280px;">
            <validation-provider v-slot="{ errors }" name="Zip Code" rules="max:10">
              <v-text-field v-model="postal_code" :error-messages="errors" label="Zip Code" required outlined>
              </v-text-field>
            </validation-provider>
          </div>
        </div>

        <validation-provider v-slot="{ errors }" name="Goal">
          <v-select v-model="goal" :items="goals" :item-text="'goal_desc'" :error-messages="errors" label="Fitness Goal (Optional)" data-vv-name="goal" outlined>
          </v-select>
        </validation-provider>

        <validation-provider v-slot="{ errors }" name="Sport">
          <v-select v-model="sport" :items="sports" :item-text="'sport_desc'" :error-messages="errors" label="Sport (Optional)" data-vv-name="sport" outlined>
          </v-select>
        </validation-provider>

        <v-btn @click="submit" :disabled="invalid">
          submit
        </v-btn>

        <v-btn @click="clear">
          clear
        </v-btn>

        <p>{{ msg }}</p>

      </form>
    </div>

  </validation-observer>
</template>





<script>
import AuthService from '@/services/AuthService.js';
import StudentService from '@/services/StudentService.js';
import MailService from '@/services/MailService.js'
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
  name: 'StudentCreateAccount',
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
      day: null,
      month: null,
      year: null,
      address: null,
      city: null,
      state: null,
      zip_code: null,
      goal: null,
      sport: null,
      select: null,
      goals: [{ }],
      sports: [{ }],
      states: ['AK', 'AL', 'AR', 'AS', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL',
        'GA', 'GU', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD',
        'ME', 'MI', 'MN', 'MO', 'MP', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ',
        'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN',
        'TX', 'UM', 'UT', 'VA', 'VI', 'VT', 'WA', 'WI', 'WV', 'WY'],
      show1: false,
      msg: '',
      msg2: '',
    }
  },

    methods: {
      async submit(){
        var goal_id_v = this.getGoalKey();
        var sport_id_v = this.getSportKey();
        try {
          const credentials = {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            password: this.password,
            phone: this.phoneNumber,
            dob: this.year + "-" + this.month + "-" + this.day,
            address: this.address,
            city: this.city,
            state: this.state,
            postal_code: this.postal_code,
            goal_id: goal_id_v,
            sport_id: sport_id_v,
            student_location_id: 1 //katy
          };

          const response = await AuthService.signUp(credentials);
          this.msg = response.msg;
          this.$router.push('/student-login');

          const reply = await MailService.newAcc(credentials);
            console.log(reply)

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
        this.day= null;
        this.month= null;
        this.year= null;
        this.address= null;
        this.city= null;
        this.state= null;
        this.zip_code = null,
        this.goal= null;
        this.sport= null;
        this.select= null;
      },
      getGoalKey(){
        let oneG = this.goals.filter(obj => { return obj.goal_desc === this.goal});
        if (!oneG[0]) {return null;}
        else {return oneG[0].goal_id}
      },
      getSportKey(){
        let oneG = this.sports.filter(obj => { return obj.sport_desc === this.sport});
        if (!oneG[0]) {return null}
        else {return oneG[0].sport_id}
      },
    },
    async mounted() {
      try {
        const response1 = await StudentService.listGoals();
        this.goals = response1;
        const response2 = await StudentService.listSports();
        this.sports = response2;
      } catch (error) {
        console.log(error);
        this.msg = error.response.data.msg;
      }
    },
}

</script>

<style scoped>
  #form-div {
    padding-top: 10px;
    padding-bottom: 60px;
    width: 100%;
  }
  #studentForm {
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
  .addressForm {
    display: table;
  }
  .addressFormItem{
    display: table-cell;
  }
</style>
