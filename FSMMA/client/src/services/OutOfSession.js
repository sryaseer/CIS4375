import axios from "axios";
const url = "http://localhost:5562/";

export default {
  MailRequest() {
    return axios
      .post(url + "out-of-session/")
      .then((response) => response.data);
  },
};