<template>
    <v-container>
        <!-- Student will become <$Student> once connection to DB -->
        <div>
            <h3 class="p-2">Student History Page</h3>
        </div>

        <!-- Top - Form to input a new health change -->
        <div>
            <v-form @submit.prevent="submit">
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="bmiInput" label="BMI"></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-text-field v-model="weightInput" label="Weight"></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-text-field v-model="fatprcntInput" label="Fat %"></v-text-field>
                    </v-col>

                    <v-col cols="15" md="9">
                        <v-btn class="mr-4" type="submit">
                            submit
                        </v-btn>

                        <v-btn @click="clear">
                            clear
                        </v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </div>
        <!-- Middle - Show changes to bmi / weight / fat percentage per date -->
        <div>
            <h3 class="p-2">Health History</h3>

            <v-data-table :headers="healthHeader" :items="healthEntries" :items-per-page="5" class="elevation-1"></v-data-table>
            <h3 class="p-5">Sessions Attended</h3>
            <!-- Bottom - Show what sessions they have attended / missed -->
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
        this.$router.push('/StudentLogin');
      }
    },
};
</script>

<style scoped>
h3 {
    text-align: center;
}
</style>
