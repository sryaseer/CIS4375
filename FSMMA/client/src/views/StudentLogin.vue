<template>
  <v-container>
    <v-form v-model="valid" @submit.prevent="submit">
    <br></br>
      <h3> Student Login Page </h3>

        <v-row justify="center" align="center">

        <v-col cols="15" md="9">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required>
          </v-text-field>
        </v-col>

          <v-col cols="15" md="9">
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Password"
              required>
            </v-text-field>
          </v-col>

          <v-col cols="15" md="9">
            <v-btn
            class="mr-4"
            type="submit"
            :disabled="invalid">
              submit
            </v-btn>

            <v-btn @click="clear">
              clear all
            </v-btn>
          </v-col>

        </v-row>

      </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'StudentLogin',
  components: {
  },
  data: () => ({
    valid: false,
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => v.length >= 8 || 'Password must be at least 8 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
  }),
  methods: {
      submit () {
        this.$refs.observer.validate()
      },
      clear () {
        this.email = ''
        this.password = ''
      },
    },
}
</script>

<style scoped>

h3 {
  text-align: center;
}

</style>
