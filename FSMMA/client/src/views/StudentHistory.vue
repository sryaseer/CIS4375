<template>
    <v-container>
        <!-- Student will become <$Student> once connection to DB -->
        <div>
            <h3 class="p-2">Student History Page</h3>
        </div>

        <!-- Top - Form to input a new health change -->
        <div>
            <v-form v-model="valid" @submit.prevent="submit">
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
                        <v-btn class="mr-4" type="submit" :disabled="invalid">
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
export default {
    name: 'StudentHistory',
    components: {},
    data: () => ({
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
        sessionEntries: [
            {
                date: '08/11/2021',
                time: '9:00 AM',
                instructorName: 'Mike Tyson',
                attendance: 'Yes',
                sessionStatus: 'Completed'
            },
            {
                date: '08/12/2021',
                time: '9:00 AM',
                instructorName: 'Mike Tyson',
                attendance: 'No',
                sessionStatus: 'Cancelled'
            },
            {
                date: '08/13/2021',
                time: '9:30 AM',
                instructorName: 'Tien Nguyen',
                attendance: 'Yes',
                sessionStatus: 'Completed'
            },
            {
                date: '08/14/2021',
                time: '9:30 AM',
                instructorName: 'Tien Nguyen',
                attendance: 'Yes',
                sessionStatus: 'Completed'
            },
            {
                date: '08/15/2021',
                time: '9:30 AM',
                instructorName: 'Tien Nguyen',
                attendance: 'Yes',
                sessionStatus: 'Completed'
            }
        ]
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
        getPhysicalHistory() {}
    },
    mounted() {
        document.title = 'My History Info';
    }
};
</script>

<style scoped>
h3 {
    text-align: center;
}
</style>
