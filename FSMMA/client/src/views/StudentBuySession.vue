<template>
  <div class="ma-5 pa-5">
    <div>
      <p style="text-align: center; font-size: 25px;">Buy Sessions Below</p>
    </div>
    <v-app>
      <div>
        <v-row>
          <v-col>
            <v-card class="ma-5 pa-5 card">
              <p style="font-size: 18px;" class="text-right">Available balance: <b>{{currentCredits}} sessions </b></p>
              <v-flex xs="12" sm="6" md="3" class="pa-10">
                <p>Single session is $60.</p>
                <p>5+ sessions = $55 per session.</p>
                <p>10+ sessions = $50 per session.</p>

                <v-text-field type="number" min="0" max="100" :rules="[rules.required]" v-model.number="sessions"/>
                <br>
                <v-row>
                Total Cost: &nbsp
                <p v-if="sessions > 4" style="color:#7e0f0f; text-decoration: line-through;">
                  <b> ${{total + savings}} </b>
                </p> &nbsp
                <p> <b>${{ total }}</b> </p>

              </v-row>
              <v-row>
                <p v-if="sessions > 4">
                  Savings: <b>${{savings}} </b> </p>
              </v-row>
              </v-flex>
            </v-card>
          </v-col>

          <v-col>
            <v-card class="ma-5 pa-5 card">

                <h1>Hello, There</h1>
                <p>Welcome to Paypal checkout Demo</p>
                <div class="input-group">
                  <span class="input-group-addon">$</span>
                  <input
                    type="number"
                    class="form-control"
                    v-model="total"
                    aria-label="Amount (to the nearest dollar)"
                  />
                  <span class="input-group-addon">.00</span>
                </div>
                <br /><br /><br />
                <paypalb :amount="total"></paypalb>

            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-app>
  </div>
</template>

<script>
import paypalb from './paypalb'

export default {
  name: "StudentBuySession",
  data() {
    return {
      sessions: 0,
      message:null,
      currentCredits: 4,
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
    savings(){
      return ((this.sessions * 60) - this.total);
    }
  },

  methods: {
    BuySubmit() {
      this.currentCredits += this.sessions;
      this.sessions = 0;
    }
  },
  created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/StudentLogin');
    }
  },

  components: {
    'paypalb': paypalb
  },
};
</script>


<style scoped>

.card{
  height: 100%;
  min-width: 400px;
}

.textgraycenter{
  color: gray;
  padding-top: 20px;
}

</style>
