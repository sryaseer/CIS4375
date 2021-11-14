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

  
  outOfSession() {
      return axios
        .post(url + "out-of-session/")
        .then((response) => response.data);
  },

  apptReminder(){
    return axios
        .post(url + "appt-reminder/")
        .then((response) => response.data);
  },

  promotionEmail(){
    return axios
    .post(url + "promotion-email/")
    .then((response) => response.data);
  },

  newAcc(credentials){
    return axios
    .post(url + "new-account/", credentials)
    .then((reply) => reply.data);
  }
  

};
