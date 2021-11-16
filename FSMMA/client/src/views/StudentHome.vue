<template>
  <div id="page">
    <div class="upcomingSessions"> <!-- Upcoming Sessions Table -->
      <p class="subtitle">UPCOMING PRIVATE SESSIONS</p>
      <v-data-table :headers="sessionHeader" :items="sessionEntries" :items-per-page="5" class="elevation-1"></v-data-table>
    </div>

  </div>
</template>

<script>
import AuthService from '@/services/AuthService.js';
import StudentService from '@/services/StudentService.js';

export default {
  name: 'StudentHome',
  components: {
  },
  data() {
    return{
      sessionHeader: [
          {
              text: 'Date',
              align: 'start',
              value: 'date'
          },
          { text: 'Time', value: 'time' },
          { text: 'Instructor', value: 'instructorName' },
          { text: 'Status', value: 'sessionStatus' }
      ],
      sessionEntries: [],
      }
    },
    computed: {
    },
    async mounted () {
      document.title = 'FSMMA SESSIONS';
      this.student_id = this.$store.getters.getUser.student_id;
      try {
        const credentials = {
          student_id: this.student_id,
        }
        const response = await StudentService.studentGetFutureSessions(credentials);
        for (const session of response) {
          var obj = {
            instructorName: session.first_name + " " + session.last_name,
            date: new Date(session.date).toLocaleDateString("en-US"),
            time: session.time,
            sessionStatus: session.session_status_desc,
          };
          this.sessionEntries.push(obj);
        }

      } catch(error){
        console.log(error);
      }
    },
    created() {
      if (!this.$store.getters.isLoggedIn) {
        this.$router.push('/student-login');
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout');
        this.$router.push('/student-login');
      },
    },
  }
</script>

<style scoped>

  #page {
    width: 90%;
    margin: auto;
    padding: 20px;
  }

.subtitle{
  text-align: center;
  font-size: 14px;
}
.upcomingSessions{
  margin: 20px;
}

</style>
