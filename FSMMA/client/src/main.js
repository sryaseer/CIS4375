import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import Axios from 'axios';
import { ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
//Vuetify
import Vuetify from 'vuetify';
import vuetify from './plugins/vuetify'

//authorization jwt token passed to each call
Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

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
