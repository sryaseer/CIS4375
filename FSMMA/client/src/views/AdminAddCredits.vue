<template>
  <v-container id="mainDiv">
      <p style="text-align: center; font-size: 18px;">ADD SESSION CREDITS</p>
    <v-row dense>
      <v-col cols="12" align="center" dense>
        <v-card class="ma-5 pa-5 card1">
          <p style="font-size: 18px;" class="text-center">Available balance: <b>{{this.currentCredits}} Sessions</b></p>
        </v-card>
        <v-card class="ma-5 pa-5 card1">
          <v-col cols="5" sm="5" md="5" align="center">
            <v-form>
                <v-text-field v-model="sessions" label="Number of Sessions*" :rules="sessionRules" required>
                </v-text-field>

                <v-text-field v-model="total" label="Total $*" :rules="totalRules"required>
                </v-text-field>

                <v-select v-model="method" :items="methods" return-object :item-text="'method_desc'" label="Payment Method*" outlined required>
                </v-select>

                <v-btn @click="submit" dark> Submit
                </v-btn>
                <p> {{this.msg}} </p>
            </v-form>
          </v-col>
        </v-card>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import StudentService from '@/services/StudentService.js';


export default {
    name:'AdminAddCredits',
    props:[],
    data() {
      return {
        student_id: null,
        sessions: null,
        message: null,
        currentCredits: null,
        total: null,
        method: null,
        method_id: null,
        methods: [{'method_id': 1, 'method_desc': 'Paypal'},
                  {'method_id': 2, 'method_desc': 'Credit Card'},
                  {'method_id': 3, 'method_desc': 'Cash'},
                  {'method_id': 4, 'method_desc': 'Online (Other)'}, ],
      sessionRules: [ (value) => value <= 100 || "Value must be between 0 and 100"],
      totalRules: [ (value) => value <= 5000 || "Value must be between 0 and 5000"],
      msg: null,
      }
    },
    methods:{
      async addCredits(){
        try {
          let credentials = {
            student_id: this.student_id,
            session_credits: parseInt(this.sessions) + parseInt(this.currentCredits),
          }
          const response = await StudentService.studentAddCredits(credentials);
          this.sessions = 0;
        } catch (error) {
          console.log(error);
        }
        this.getCurrentSessions();
      },
      async getCurrentSessions(){
        try {
          let credentials = {
            student_id: this.$route.params.id,
          }
          const response = await StudentService.viewStudentCredits(credentials);
          console.log(response[0].session_credits);
          this.currentCredits = response[0].session_credits;
        } catch (error) {
          console.log(error)
          this.msg = error.response.data.msg;
        }
      },
      async addInvoice(){
        try {
          let credentials = {
            student_id: this.student_id,
            session_credits: this.sessions,
            total: this.total,
            method_id: this.method_id,
          }
          const response = await StudentService.studentAddInvoice(credentials);
        } catch (error) {
          this.msg = error.response.data.msg;
        }
      },
      async addCredits(){
        try {
          let credentials = {
            student_id: this.student_id,
            session_credits: parseInt(this.sessions) + parseInt(this.currentCredits),
          }
          const response = await StudentService.studentAddCredits(credentials);
          this.sessions = 0;
        } catch (error) {
          console.log(error);
        }
        this.getCurrentSessions();
      },
      async CreditHistoryUpdate(){
        try {
          let credentials = {
            student_id: this.student_id,
            session_credits: parseInt(this.sessions),
          }
          const response = await StudentService.CreditHistoryUpdate(credentials);
          this.sessions = 0;
        } catch (error) {
          console.log(error);
        }
        this.getCurrentSessions();
      },
      async submit(){
        this.method_id = this.methods.findIndex(data => data === this.method) + 1;

        if (this.sessions && this.total && this.method_id){
        this.CreditHistoryUpdate();
        this.addInvoice();
        this.addCredits();
        this.sessions = null;
        this.total = null;
        this.method = null;
        }
        else {
          this.msg = "Misssing some information.";
        }
      },
    },
    mounted(){
      this.student_id = this.$route.params.id;
      this.getCurrentSessions();
    },
    async created() {
      if (!this.$store.getters.isAdminLoggedIn) {
          this.$router.push('/admin-login');
      }
      this.admin_id = this.$store.getters.getAdmin.admin_id;
    },
}

</script>

<style scoped>

</style>
