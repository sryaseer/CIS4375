import axios from "axios";
const url = "http://localhost:5562/";

export default {
  viewStudent(id) {
    return axios.get(url + "admin-view-student/" + id).then((response) => response.data);
  },

  viewInstructor(id) {
    return axios.get(url + "admin-view-instructor/" + id).then((response) => response.data);
  },

  listStudents() {
    return axios.get(url + "admin-view-student-search/").then((response) => response.data);
  },

  listInstructors() {
    return axios.get(url + "admin-view-instructor-search/").then((response) => response.data);
  },

  listGoals() {
    return axios.get(url + "get-fitness-goals/").then((response) => response.data);
  },

  listSports() {
    return axios.get(url + "get-sports/").then((response) => response.data);
  },

  listStudentTypes(){
    return axios.get(url + "get-student-types/").then((response) => response.data);
  },

  viewStudentTest(id) {
    return axios.get(url + "admin-view-student-test/" + id).then((response) => response.data);
  },

  viewAdminSchedule() {
    return axios.get(url + "admin-view-schedule/").then((response) => response.data);
  },
  //instructor_id
  viewInstructorSchedule(credentials) {
    return axios.post(url + "instructor-view-schedule/", credentials).then((response) => response.data);
  },

  viewInstructorWithStudentSchedule(credentials) {
    return axios.post(url + "instructor-signedup-schedule/", credentials).then((response) => response.data);
  },
  //Returns the amount of months a member has been registered since.
  viewMembershipLengthAllStudents() {
    return axios.get(url, +"student-get-months-membership/").then(response);
  },
  //Returns the amount of months FOR ONE member that has been registered since.
  viewMembershipLengthForOneStudents(student_id) {
    return axios.post(url + "studentid-get-months-membership/", student_id).then((response) => response.data);
  },
  //Admin Level - create a new session
  createNewSession(information) {
    return axios.post(url + "create-new-session/", information).then((response) => response.data);
  },
  //Admin Level - update session based on information provided
  updateSessionInfo(information) {
    return axios.post(url + "update-session-from-admin-schedule/", information).then((response) => response.data);
  },
  //STILL VERY BUGGY, BE CAREFUL
  deleteSessionFromDB(pass_session_id) {
    return axios.post(url + "delete-session-from-db-admin-schedule/", pass_session_id).then((response) => response.data);
  },
  deleteSignupFromDB(pass_session_id) {
    return axios.post(url + "delete-signup-from-db-admin-schedule/", pass_session_id).then((response) => response.data);
  },

  getLatestStudentHealth(credentials){
    return axios.post(url + "get-student-latest-health-entry/", credentials).then((response) => response.data);
  },

  InsertStudentHealth(credentials){
    return axios.post(url + "insert-student-new-health-entry/", credentials).then((response) => response.data);
  },

  getStudentNotes(credentials){
    return axios.post(url + "get-student-notes/", credentials).then((response) => response.data);
  },

  addNotes(credentials){
    return axios.post(url + "admin-add-notes/", credentials).then((response) => response.data);
  },
  AdminStudentSignUp(credentials){
    return axios.post(url + "admin-create-student/", credentials).then((response) => response.data);
  },

};
