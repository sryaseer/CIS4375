<template>
<div id="mainDiv">
  <div>
    <p style="text-align: center; font-size: 25px;">Buy Session Credits</p>
  </div>
  <v-row>
    <v-col cols="12" align="center">
      <v-card class="ma-5 pa-5 card">
        <div class="insideCard">

          <div id="sessionText">
            <p>Single session is $60.</p>
            <p>5+ sessions = $55 per session.</p>
            <p>10+ sessions = $50 per session.</p>
          </div>

          <v-col cols="6" sm="6" md="6" align="center">
            <v-text-field id="input" type="number" min="0" max="100" :rules="[rules.required]" v-model.number="sessions">
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6" align="center">
            <p> Total Cost: <b>${{ total }}</b> </p>
             <p v-if="sessions > 4">
               <b style="color:#7e0f0f; text-decoration: line-through;"> ${{total + savings}} </b>
               Savings: <b>${{savings}} </b>
             </p>
          </v-col>
        </div>
        <paypalb :amount="total"></paypalb>
      </v-card>
    </v-col>
    <v-col cols="12" align="center">
      <v-card class="ma-5 pa-5 card">
        <p style="font-size: 18px;" class="text-center">Available balance: <b>{{this.currentCredits}} Sessions </b></p>
      </v-card>
    </v-col>
  </v-row>
</div>
</template>

<script>
import paypalb from './paypalb'
import StudentService from '@/services/StudentService.js';


export default {
  name: "StudentBuySession",
  data() {
    return {
      student_id: null,
      sessions: 0,
      message: null,
      currentCredits: null,
      rules: {
        required: (value) => value <= 100 || "Value must be between 0 and 100",
      },
    };
  },
  computed: {
    total() {
      if (this.sessions < 5) {
        return this.sessions * 60;
      } else {
        if (this.sessions > 4 && this.sessions < 10) {
          return this.sessions * 55;
        }
      }
      if (this.sessions > 9) {
        return this.sessions * 50;
      } else {
        this.total = 0;
      }
    },
    savings() {
      return ((this.sessions * 60) - this.total);
    }
  },

  methods: {
    BuySubmit() {
      this.currentCredits += this.sessions;
      this.sessions = 0;
    }
  },
  async mounted() {
    try {
      let credentials = {
        student_id: this.student_id,
      }
      const response = await StudentService.viewStudentCredits(credentials);
      console.log(response[0].session_credits);
      this.currentCredits = response[0].session_credits;
    } catch (error) {
      this.msg = error.response.data.msg;
    }
  },
  created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/student-login');
    } else {
      this.student_id = this.$store.getters.getUser.student_id;
    }
  },

  components: {
    'paypalb': paypalb
  },
};
</script>


<style scoped>
.card {
  min-width: 350px;
  max-width: 700px;
}

.textgraycenter {
  color: gray;
  padding-top: 20px;
}

.insideCard {
  margin: 5%;
}

#mainDiv {
  padding: 20px;
  margin-bottom: 50px;
}

#sessionText {}

#input {
  width: 35px !important;
}
</style>
