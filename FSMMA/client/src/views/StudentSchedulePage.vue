<template>
  <v-container>
    <!-- Student will become <$Student> once connection to DB -->
    <p class="pageTitle">Schedule a Session</p>

    <!-- Top - This is the table of all the session upcoming for this stduent -->
    <div>
      <v-row class="fill-height">
        <v-col>
          <v-sheet height="64">
            <v-toolbar flat>
              <v-btn
                outlined
                class="mr-4"
                color="grey darken-2"
                @click="setToday"
              >
                Today
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click="prev">
                <v-icon small>
                  mdi-chevron-left
                </v-icon>
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click="next">
                <v-icon small>
                  mdi-chevron-right
                </v-icon>
              </v-btn>
              <v-toolbar-title v-if="$refs.calendar">
                {{ $refs.calendar.title }}
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-menu bottom right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    outlined
                    color="grey darken-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <span>{{ typeToLabel[type] }}</span>
                    <v-icon right>
                      mdi-menu-down
                    </v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="type = 'day'">
                    <v-list-item-title>Day</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'week'">
                    <v-list-item-title>Week</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'month'">
                    <v-list-item-title>Month</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = '4day'">
                    <v-list-item-title>4 days</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </v-sheet>
          <v-sheet height="600">
            <v-calendar
              ref="calendar"
              v-model="focus"
              color="primary"
              :events="privateSessions"
              :event-color="getEventColor"
              :type="type"
              @click:event="showEvent"
              @click:more="viewDay"
              @click:date="viewDay"
            ></v-calendar>
            <!-- @change="updateRange" -->
            <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
            >
              <v-card color="grey lighten-4" min-width="350px" flat>
                <v-toolbar :color="selectedEvent.color" dark>
                  <!-- Should be able to pull first name and last name -->
                  <!-- Currently throwing errors: "TypeError: Cannot read properties of undefined (reading 'i_first_name')" -->
                  <v-toolbar-title
                    v-html="
                      'hello ' +
                        this.privateSessions[1].i_first_name +
                        ' ' +
                        this.privateSessions[1].i_last_name
                    "
                  ></v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <!-- Should be able to pull the info about the hours start and end, and description shit -->
                  <!-- Currently throwing errors: "TypeError: Cannot read properties of undefined (reading 'i_first_name')" -->
                  <span
                    v-html="
                      'Start Time: ' +
                        this.privateSessions[1].start +
                        '<br>' +
                        'End time:' +
                        this.privateSessions[1].end +
                        '<br>'
                    "
                  ></span>
                </v-card-text>
                <v-card-actions>
                  <v-btn text color="secondary" @click="selectedOpen = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="secondary" @click="sendInfoToForm()">
                    Register
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-col>
      </v-row>
    </div>

    <!-- Middle - Form (when you click on an available slot, the form will auto populate info for session)  -->
    <div class="bottomBar">
      <v-form v-model="valid" @submit.prevent="submit">
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="sessionDate"
              label="Session Date"
              outlined
              disabled
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="sessionTime"
              label="Session Time"
              outlined
              disabled
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="instructorName"
              label="Instructor Name"
              outlined
              disabled
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="sessionStatus"
              label="Session Status"
              outlined
              disabled
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="studentName"
              label="Student Name"
              outlined
              disabled
            ></v-text-field>
          </v-col>

          <v-col cols="15" md="9">
            <v-btn class="mr-4" type="submit" @click="submitFormDateToDB()">
              submit
            </v-btn>

            <v-btn @click="clear">
              clear
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>

    <!-- Bottom - Buy Sessions (Image Link) -> Takes you to login/Create Student page  -->
    <div>
      <h5 class="pageTitle">Sessions they have attended</h5>
      <br /><br />

      <p>privateSessions {{ privateSessions }}</p>
    </div>
  </v-container>
</template>

<script>
import StudentService from "@/services/StudentService.js";

export default {
  data: () => ({
    //form data
    sessionDate: null,
    sessionTime: null,
    instructorName: null,
    sessionStatus: null,
    studentName: null,
    // end of form data

    //dummy data
    msg: [],
    //end

    //data for the calender, from vuetify
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    privateSessions: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
  }),
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    clear() {
      this.sessionDate = null;
      this.sessionTime = null;
      this.instructorName = null;
      this.sessionStatus = null;
      this.studentName = null;
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    sendInfoToForm() {
      //able to get last name. but needs a parameter for privateSession...
      console.log(this.privateSessions);
    },
  },

  async mounted() {
    this.events = [];
    try {
      const response = await StudentService.viewStudentSchedule();
      for (const session_student of response) {
        var obj = {
          session_id: session_student.session_id,
          i_first_name: session_student.i_first_name,
          i_last_name: session_student.i_last_name,
          instructor_id: session_student.instructor_id,
          first_name: session_student.first_name,
          last_name: session_student.last_name,
          student_id: session_student.student_id,
          session_status_desc: session_student.session_status_desc,
        };

        // Session Date (disabled)
        // Session Time
        // Instructor Name
        // Session Status
        // Student Name

        var date = new Date(session_student.date);
        var date2 = new Date(session_student.date);

        //getting our STARTING TIME! DO NOT DELETE
        var hourVar = "2021-11-15 " + session_student.time;
        var mockDate = new Date(hourVar);
        let hour = mockDate.getHours(hourVar);
        let minutes = mockDate.getMinutes(hourVar);
        //Setting our date to the right time.
        date.setHours(hour);
        date.setMinutes(minutes);
        obj["start"] = date;

        date2.setHours(hour + 1);
        date2.setMinutes(minutes);
        obj["end"] = date2;
        obj["color"] = this.colors[2];
        obj["timed"] = 1;

        this.privateSessions.push(obj);
      }
      //this.msg = this.privateSessions;
    } catch (error) {
      console.log(error);
      this.msg = error.response.data.msg;
    }
  },
};
</script>

<style scoped>
.pageTitle {
  text-align: center;
  font-size: 26px;
}
.bottomBar {
  margin: auto;
  width: 50%;
  height: 50%;
}
</style>
