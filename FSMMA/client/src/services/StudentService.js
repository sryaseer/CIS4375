import axios from "axios";
const url = "http://localhost:5562/";

export default {
  viewMyInfo(id) {
    return axios
      .get(url + "student-view-info/" + id)
      .then((response) => response.data);
  },

  listGoals() {
    return axios
      .get(url + "get-fitness-goals/")
      .then((response) => response.data);
  },

  listSports() {
    return axios.get(url + "get-sports/").then((response) => response.data);
  },

  loadStudentSignups() {
    return axios
      .get(url + "get-student-signups/")
      .then((response) => response.data);
  },

  loadStudentSchedule() {
    return axios
      .get(url + "get-student-schedule/")
      .then((response) => response.data);
  },

  SignupStudentSchedule() {
    return axios
      .push(url + "set-schedule-signup/")
      .then((response) => response.data);
  },

  viewStudentSchedule() {
    return axios
      .get(url + "student-view-schedule/")
      .then((response) => response.data);
  },

  studentCancelSignUp() {
    return axios
      .push(url + "student-cancels-signup/")
      .then((response) => response.data);
  },

  studentAddNotes() {
    return axios
      .push(url + "add-student-note/")
      .then((response) => response.data);
  },
};
