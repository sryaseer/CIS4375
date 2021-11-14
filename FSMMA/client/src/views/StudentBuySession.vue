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
            <validation-observer ref="observer" v-slot="{ invalid }" >
              <validation-provider v-slot="{ errors }" name="total sessions" rules="digits:1|between:1,100">
                <v-text-field v-model="sessions" :error-messages="errors" label="total sessions" required>
                </v-text-field>
              </validation-provider>
            </validation-observer >
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
          <div v-if="!paidFor">
            <h3>Buy this Lamp - ${{ product.price }} OBO</h3>

            <p>{{ product.description }}</p>

          </div>

          <div v-if="paidFor">
            <h3>Transaction was successful!</h3>
          </div>

          <div ref="paypal"></div>
        </div>

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
      currentCredits: null,
      loaded: false,
      paidFor: false,
      rules: {
        required: (value) => value <= 100 || "Value must be between 0 and 100",
      },
    };
  },
  computed: {
    total() {
      if (this.sessions >= 0 && this.sessions < 5) {
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
    },
    product(){
      let price = this.total
      let description = "Total for private session credits."

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
            console.log(order);
          },
          onError: err => {
            console.log(err);
          }
        })
        .render(this.$refs.paypal);
    },
    BuySubmit() {
      this.currentCredits += this.sessions;
      this.sessions = 0;
    }
  },
  async mounted() {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=Aa0bm92nNDGNVIE_NE2cph_AyyEHMqP5XgJYF94W0GGj2OakhlmTuf6s_3-Dy3MaWO6eBoXg4vt-9KBh";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);

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
    ValidationProvider,
    ValidationObserver,
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
