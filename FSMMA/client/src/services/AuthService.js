import axios from 'axios';
const url = 'http://localhost:5562/';

export default {
  login(credentials) {
    return axios
      .post(url + 'student-login/', credentials)
      .then(response => response.data);
  },
  signUp(credentials) {
    return axios
      .post(url + 'student-sign-up/', credentials)
      .then(response => response.data);
  },
  getSecretContent() {
    return axios.get(url + 'student-secret-route/').then(response => response.data);
  },
  getSecretAdminContent() {
    return axios.get(url + 'admin-secret-route/').then(response => response.data);
  },
  adminLogin(credentials) {
    return axios
      .post(url + 'admin-login/', credentials)
      .then(response => response.data);
  },
  changePassword(credentials) {
    return axios
      .post(url + 'change-password/', credentials)
      .then(response => response.data)
  }
};
