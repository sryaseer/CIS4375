<template>
<v-container id="mainDiv">
    <p style="text-align: center; font-size: 18px;">BUY SESSION CREDITS</p>
  <v-row dense>
    <v-col cols="12" align="center" dense>
      <v-card class="ma-5 pa-5 card1">
        <p style="font-size: 18px;" class="text-center">Available balance: <b>{{this.currentCredits}} Sessions </b></p>
      </v-card>
    </v-col>
    <v-col cols="12" align="center" dense>
      <v-card class="ma-5 pa-5 card2">
        <div class="insideCard">

          <div id="sessionText">
            <p>Single session is $60.</p>
            <p>5+ sessions = $55 per session.</p>
            <p>10+ sessions = $50 per session.</p>
          </div>
          <v-col cols="5" sm="5" md="5" align="center">
                <v-text-field id="sessionsInput" v-model="sessions" label="total sessions" append-outer-icon="mdi-plus-box"
                @click:append-outer="increment" prepend-icon="mdi-minus-box" @click:prepend="decrement" :rules="[numberRules.required]" :readonly="true" required>
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
        <div>
          <p v-if="!paidFor && sessions > 0">Pay for {{this.sessions}} session credits - ${{ product.price }} </p>

          <div v-if="paidFor">
            <h3>Transaction was successful!</h3>
          </div>

          <div ref="paypal"></div>
        </div>

      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import StudentService from '@/services/StudentService.js';
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
  name: "StudentBuySession",
  data() {
    return {
      student_id: null,
      sessions: 0,
      message: null,
      currentCredits: 0,
      loaded: false,
      paidFor: false,
      numberRules: {
        required: (value) => value <= 100 || "Value must be between 0 and 100",
      },
    };
  },
  computed: {
    total() {
      if (this.sessions < 0){
        this.sessions = 0;
      }
      if (this.sessions >= 0 && this.sessions < 5) {
        return this.sessions * 60;
      } else {
        if (this.sessions > 4 && this.sessions < 10) {
          return this.sessions * 55;
        }
      }

      if (this.sessions > 9) {
        return this.sessions * 50;
      }

      else {
        this.total = 0;
      }
    },
    savings() {
      return ((this.sessions * 60) - this.total);
    },
    product(){
      let price = this.total
      let description = "Total for private session credits (" + this.sessions + ") count."

      return {'price': price, 'description': description}
    }
  },

  methods: {
    setLoaded: function() {
      this.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{
                description: this.product.description,
                amount: {
                  currency_code: "USD",
                  value: this.product.price
                }
              }]
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.paidFor = true;
            this.addCredits();
            console.log(order);
          },
          onError: err => {
            console.log(err);
          }
        })
        .render(this.$refs.paypal);
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
    async getCurrentSessions(){
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
    increment(){
      this.sessions += 1;
    },
    decrement(){
      this.sessions -= 1;
    }
  },
  async mounted() {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=Aa0bm92nNDGNVIE_NE2cph_AyyEHMqP5XgJYF94W0GGj2OakhlmTuf6s_3-Dy3MaWO6eBoXg4vt-9KBh";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);

    this.getCurrentSessions();
  },
  created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/student-login');
    } else {
      this.student_id = this.$store.getters.getUser.student_id;
    }
  },

  components: {
    ValidationProvider,
    ValidationObserver,
  },
};
</script>


<style scoped>
.card1 {
  min-width: 350px;
  max-width: 700px;
}

.card2 {
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
  margin-bottom: 50px;
}

#sessionText {}

#sessionsInput{
  text-align: center;
}
</style>
