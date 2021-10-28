import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import { ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
//Vuetify
import Vuetify from 'vuetify';
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

//Vue.use(ValidationProvider)

Vue.use(Vuetify)

new Vue({
  router,
  store,
  render: h => h(App),
  vuetify,
  vuetify: new Vuetify()
}).$mount('#app')
