<template>
  <validation-observer ref="observer" v-slot="{ invalid }" >


    <div id="form-div">
      <p style="text-align: center; font-size: 28px;"> Create Student Account </p>
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
          <div class="dateFormItem" style="min-width: 105px; width: 140px;">
            <p>Date of Birth:</p>
          </div>
          <div class="dateFormItem" style="min-width: 60px; max-width: 100px;">
            <validation-provider v-slot="{ errors }" name="Day" rules="required|digits:2|between:1,31">
              <v-text-field v-model="day" :error-messages="errors" label="DD" required outlined>
              </v-text-field>
            </validation-provider>
          </div>
          <div class="dateFormItem" style="min-width: 60px; max-width: 100px;">
            <validation-provider v-slot="{ errors }" name="Month" rules="required|digits:2|between:1,12" >
              <v-text-field v-model="month" :error-messages="errors" label="MM" required outlined>
              </v-text-field>
            </validation-provider>
          </div>
          <div class="dateFormItem" style="min-width: 85px; max-width: 320px;">
            <validation-provider v-slot="{ errors }" name="Year" rules="required|digits:4|between:1900,2021">
              <v-text-field v-model="year" :error-messages="errors" label="YYYY" required outlined>
              </v-text-field>
            </validation-provider>
          </div>
        </div>

        <validation-provider v-slot="{ errors }" name="Address" rules="required|min:10">
          <v-text-field v-model="address" :error-messages="errors" label="Street Address" required outlined>
          </v-text-field>
        </validation-provider>

        <div class="addressForm">
          <div class="addressFormItem" style="padding-right: 50px; width: 400px;">
            <validation-provider v-slot="{ errors }" name="City" rules="required|max:30">
              <v-text-field v-model="city" :error-messages="errors" label="City" required outlined>
              </v-text-field>
            </validation-provider>
          </div>
          <div class="addressFormItem">
            <validation-provider v-slot="{ errors }" name="State" rules="required|max:2">
              <v-select v-model="state" :items="states" :error-messages="errors" label="State" data-vv-name="state" required outlined>
              </v-select>
            </validation-provider>
          </div>
        </div>

        <validation-provider v-slot="{ errors }" name="Goal">
          <v-select v-model="goal" :items="goals" :error-messages="errors" label="Fitness Goal (Optional)" data-vv-name="goal" outlined>
          </v-select>
        </validation-provider>

        <validation-provider v-slot="{ errors }" name="Sport">
          <v-select v-model="sport" :items="sports" :error-messages="errors" label="Sport (Optional)" data-vv-name="sport" outlined>
          </v-select>
        </validation-provider>


        <v-btn class="mr-4" type="submit" :disabled="invalid">
          submit
        </v-btn>

        <v-btn @click="clear">
          clear
        </v-btn>

      </form>
    </div>

  </validation-observer>
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
  name: 'CreateStudentAccount',
  components: {
      ValidationProvider,
      ValidationObserver,
    },
  data: () => ({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      day: null,
      month: null,
      year: null,
      address: '',
      city: '',
      state: null,
      goal: null,
      sport: null,
      select: null,
      goals: [
        '',
        'Body Building',
        'Bootcamp',
        'Competitive Training',
        'Technique Improvement',
        'Weight Loss',
        'Overall Health',
        'Other',
      ],
      sports: [
        '',
        'Brazilian Jiu Jitsu',
        'Mixed Martial Arts',
        'Kickboxing',
        'Other',
      ],
      states: ['AK', 'AL', 'AR', 'AS', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL',
        'GA', 'GU', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD',
        'ME', 'MI', 'MN', 'MO', 'MP', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ',
        'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN',
        'TX', 'UM', 'UT', 'VA', 'VI', 'VT', 'WA', 'WI', 'WV', 'WY'],
      checkbox: null,
      show1: false,
    }),

}

</script>

<style>
  #form-div {
    padding-top: 10px;
    width: 100%;
    border: solid 1px black;
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
