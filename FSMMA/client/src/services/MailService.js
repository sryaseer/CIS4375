import axios from "axios";
const url = "http://localhost:5562/";

export default {
  MailRequest() {
    return axios
      .post(url + "mail-service-request/")
      .then((response) => response.data);
  },

  forgotPassword(credentials) {
    return axios
      .post(url + "forgot-password/", credentials)
      .then((response) => response.data);
  },
};
