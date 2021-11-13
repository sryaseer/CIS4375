<template>
    <v-container>
        <!-- Student will become <$Student> once connection to DB -->
        <p class="titles"> Student History Page </p>

        <!-- TOP - Show changes to bmi / weight / fat percentage per date -->
        <div class="container1">
          <p class="subtitle">Health History</P>
          <v-data-table :headers="healthHeader" :items="healthEntries" :items-per-page="5" class="elevation-1"></v-data-table>
        </div>

        <div class="container1">
            <p class="subtitle">New Health Measure:</p>
        <!-- MIDDLE - Form to input a new health change -->
            <v-form @submit.prevent="submit">
                <v-row>
                    <v-col cols="4" md="4">
                        <v-text-field v-model="bmiInput" label="BMI"></v-text-field>
                    </v-col>
                    <v-col cols="4" md="4">
                        <v-text-field v-model="weightInput" label="Weight"></v-text-field>
                    </v-col>
                    <v-col cols="4" md="4">
                        <v-text-field v-model="fatprcntInput" label="Fat %"></v-text-field>
                    </v-col>
                    <v-col cols="15" md="9">
                        <v-btn class="mr-4" type="submit"> submit </v-btn>
                        <v-btn @click="clear"> clear </v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </div>
        <!-- Bottom - Show what sessions they have attended / missed -->
        <div class="container1">
            <p class="subtitle">Sessions Attended</p>
            <v-data-table :headers="sessionHeader" :items="sessionEntries" :items-per-page="5" class="elevation-1"></v-data-table>
        </div>
    </v-container>
</template>

<script>
import StudentService from "@/services/StudentService.js";

export default {
    name: 'StudentHistory',
    components: {},
    data: () => ({
      student_id: '',
      bmiInput: '',
      weightInput: '',
      fatprcntInput: '',
      healthHeader: [
            {
                text: 'Date',
                align: 'start',
                value: 'date'
            },
            { text: 'Weight (lbs)', value: 'weight' },
            { text: 'Fat (%)', value: 'fat' },
            { text: 'BMI', value: 'bmi' }
        ],
        healthEntries: [
            {
                date: '10/11/2021',
                weight: 180,
                fat: 17.3,
                bmi: 25.8
            },
            {
                date: '10/13/2021',
                weight: 179,
                fat: 17,
                bmi: 25.3
            },
            {
                date: '10/15/2021',
                weight: 178,
                fat: 17,
                bmi: 25.1
            },
            {
                date: '10/17/2021',
                weight: 178,
                fat: 16,
                bmi: 25.1
            },
            {
                date: '10/21/2021',
                weight: 177,
                fat: 16,
                bmi: 25
            },
            {
                date: '10/23/2021',
                weight: 178,
                fat: 17,
                bmi: 25.2
            }
        ],
        sessionHeader: [
            {
                text: 'Date',
                align: 'start',
                value: 'date'
            },
            { text: 'Time', value: 'time' },
            { text: 'Instructor Name', value: 'instructorName' },
            { text: 'Attendance', value: 'attendance' },
            { text: 'Session Status', value: 'sessionStatus' }
        ],
        sessionEntries: [],
    }),
    methods: {
        submit() {
            this.$refs.observer.validate();
        },
        clear() {
            this.bmiInput = '';
            this.weightInput = '';
            this.fatprcntInput = '';
        },
        insertNewInfo() {},
        getPhysicalHistory() {},
    },
    async mounted() {
        document.title = 'My History Info';
        this.student_id = this.$store.getters.getUser.student_id;
        try {
          const credentials = {
            student_id: this.student_id,
          }
          const response = await StudentService.studentGetPastSessions(credentials);
          for (const session of response) {
            var obj = {
              instructorName: session.first_name + " " + session.last_name,
              date: new Date(session.date).toLocaleDateString("en-US"),
              time: session.time,
              sessionStatus: session.session_status_desc,
              attendance: session.attendance,
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
};
</script>

<style scoped>

.titles {
  text-align: center;
  font-size: 26px;
}

.subtitle{
  text-align: left;
  font-size: 16px;
  font-weight: 300;
}
.container1{
  margin: 20px;
  padding-bottom: 30px;
}
</style>
