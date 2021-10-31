import axios from 'axios';
const url = 'http://localhost:5562/';

export default {
  viewMyInfo(id) {
    return axios.get(url + 'student-view-info/' + id).then(response => response.data);
  },

  listGoals() {
    return axios
      .get(url + 'get-fitness-goals/').then(response => response.data);
  },

  listSports() {
    return axios
      .get(url + 'get-sports/').then(response => response.data);
  },

};
