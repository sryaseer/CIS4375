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

  SignupStudentSchedule(credentials) {
    return axios
      .post(url + "set-schedule-signup/", credentials)
      .then((response) => response.data);
  },

  viewStudentSchedule() {
    return axios
      .get(url + "student-view-schedule/")
      .then((response) => response.data);
  },

  studentCancelSignUp(credentials) {
    return axios
      .post(url + "student-cancels-signup/", credentials)
      .then((response) => response.data);
  },

  studentAddNotes(information) {
    return axios
      .post(url + "add-student-note/", information)
      .then((response) => response.data);
  },

  studentGetPastSessions(credentials) {
    return axios
      .post(url + "student-get-past-sessions/", credentials)
      .then((response) => response.data);
  },

  studentGetMemberSince(student_id) {
    return axios
      .post(url, +"studentid-get-months-membership/", student_id)
      .then((response) => response.data);
  },

  studentGetFutureSessions(credentials) {
    return axios
      .post(url + "student-get-future-sessions/", credentials)
      .then((response) => response.data);
  },

  studentGetInfo(credentials) {
    return axios
      .post(url + "student-get-my-info/", credentials)
      .then((response) => response.data);
  },
  viewStudentCredits(credentials) {
    return axios
      .post(url + "student-view-credits/", credentials)
      .then((response) => response.data);
  },
  studentAddCredits(credentials){
    return axios
      .post(url + "student-add-credits/", credentials)
      .then((response) => response.data);
  },
  studentAddInvoice(credentials){
    return axios
      .post(url + "add-student-invoice/", credentials)
      .then((response) => response.data);
  },
  CreditHistoryUpdate(credentials){
    return axios
      .post(url + "credit-hist-update/", credentials)
      .then((response) => response.data);
  },


};
