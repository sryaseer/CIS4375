import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

const getDefaultState = () => {
  return {
    adminToken: '',
    token: '',
    user: {},
    admin: {},
  };
};

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state: getDefaultState(),
  getters: {
    isLoggedIn: state => {
      return state.token;
    },
    getUser: state => {
      return state.user;
    },
    getAdmin: state => {
      return state.admin;
    },
    isAdminLoggedIn: state => {
      if (state.admin.admin_id){
        return state.adminToken;
      }
    },
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_ADMIN: (state, admin) => {
      state.admin = admin;
    },
    SET_ADMIN_TOKEN: (state, adminToken) => {
      state.adminToken = adminToken;
    },
    RESET: state => {
      Object.assign(state, getDefaultState());
    }
  },
  actions: {
    studentLogin: ({ commit, dispatch }, { token, user }) => {
      commit('SET_TOKEN', token);
      commit('SET_USER', user);
      // set auth header
      Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    adminLogin:({ commit, dispatch }, { adminToken, admin }) => {
      commit('SET_ADMIN_TOKEN', adminToken);
      commit('SET_ADMIN', admin);
      // set auth header
      Axios.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
    },
    logout: ({ commit }) => {
      commit('RESET', '');
    }
  }
});

/* export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
*/
