import axios from 'axios';
const url = 'http://localhost:5562/';

export default {
  viewStudent(id) {
    return axios.get(url + 'admin-view-student/' + id).then(response => response.data);
  },

  listStudents() {
    return axios.get(url + 'admin-view-student-search/').then(response => response.data);
  },

  viewStudentTest(id) {
    return axios.get(url + 'admin-view-student-test/' + id).then(response => response.data);
  },

  viewAdminSchedule() {
    return axios.get(url + 'admin-view-schedule/').then(response => response.data);
  },
};
