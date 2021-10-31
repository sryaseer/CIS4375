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
  }
};
