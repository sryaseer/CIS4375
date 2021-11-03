<template>
  <div class="ma-5 pa-5">
    <div class="ma-5 pa-5 text-center">
      <v-card-title>Buy Session Below</v-card-title>
    </div>
    <v-app>
      <div>
        <v-row>
          <v-col>
            <v-card class="ma-5 pa-5 card">
              <h3 class="ma-5 pa-5 text-right">Current Credits: {{ }}</h3>
              <v-flex xs="12" sm="6" md="3">
                <p>Single session is $60.</p>
                <p>5+ sessions = $55 per session.</p>
                <p>10+ sessions = $50 per session.</p>

                <v-text-field
                  type="number"
                  min="0"
                  max="100"
                  :rules="[rules.required]"
                  v-model.number="credit"
                />
                <v-row class="ma-2">
                  <v-btn color="primary" @click="tryme">Calculate</v-btn>

                  <p class="ma-2">Total Cost: ${{ message }}</p>
                </v-row>
              </v-flex>
            </v-card>
          </v-col>

          <v-col>
            <v-card class="ma-5 pa-5 card">
              <h3 class="ma-5 pa-5">Make a Payment</h3>
              <div d-flex justify-center align-center pa-12 flex-column>
                <div>
                  <form
                    novalidate="novalidate"
                    class="v-form py-5 align-center text-center"
                  >
                    <div
                      class="
                        v-input v-input--is-label-active v-input--is-dirty
                        theme--light
                        v-text-field
                        v-text-field--filled
                        v-text-field--is-booted
                        v-text-field--enclosed
                        v-text-field--rounded
                      "
                    >
                      <div class="v-input__control">
                        <div class="v-input__slot">
                          <div class="v-text-field__slot">
                            <label
                              for="input-37"
                              class="v-label v-label--active theme--light"
                              style="left: 0px; right: auto; position: absolute"
                              >Payment Amount $ (USD)</label
                            >
                            <input
                              large=""
                              required="required"
                              id="input-37"
                              type="number"
                            />
                          </div>
                          <div class="v-input__append-inner">
                            <div class="v-input__icon v-input__icon--clear">
                              <i
                                role="button"
                                class="
                                  v-icon
                                  notranslate
                                  v-icon--link
                                  fa fa fa fa-times
                                  theme--light
                                "
                              ></i>
                            </div>
                          </div>
                        </div>
                        <div class="v-text-field__details">
                          <div class="v-messages theme--light">
                            <div class="v-messages__wrapper"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="px-6">
                      <button
                        type="button"
                        class="
                          v-btn v-btn--block v-btn--contained
                          theme--light
                          v-size--x-large
                          primary
                        "
                      >
                        <span class="v-btn__content">
                          Pay Now
                          <i
                            aria-hidden="true"
                            class="
                              v-icon
                              notranslate
                              ml-2
                              fab
                              fa-paypal
                              theme--light
                            "
                          ></i
                        ></span>
                      </button>
                    </div>
                    <div class="pa-2">You will be charged: ${{ message }}</div>
                  </form>
                </div>
              </div>
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
                    v-model="amount"
                    aria-label="Amount (to the nearest dollar)"
                  />
                  <span class="input-group-addon">.00</span>
                </div>
                <br /><br /><br />
                <paypalb :amount="amount"></paypalb>

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
      credit: "",
      message: null,
      rules: {
        required: (value) => value <= 100 || "Value must be between 0 and 100",
      },
    };
  },
  computed: {
    total() {
      if (this.credit < 5) {
        return this.credit * 60;
      } else {
        if (this.credit > 4 && this.credit < 10) {
          return this.credit * 55;
        }
      }
      if (this.credit > 9) {
        return this.credit * 50;
      } else {
      }
    },
  },

  methods: {
    tryme() {
      this.message = this.total;
    },
  },

  components: {
    'paypalb': paypalb
  },
};
</script>

<style >

.card{
  height: 100%;
}

.textgraycenter{
  color: gray;
  padding-top: 20px;
}

</style>
