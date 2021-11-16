<template>
  <v-container>
    <!-- Student will become <$Student> once connection to DB -->
    <p style="text-align: center; font-size: 18px;">ADMIN CREATE SESSIONS</p>

    <v-col>
      <v-expansion-panels focusable>
        <v-expansion-panel>
          <v-expansion-panel-header
            >Create New Sessions
            <template v-slot:actions>
              <v-icon color="primary">
                $expand
              </v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="pa-1">
            <form @submit.prevent="submit">
              <v-row>
                <!-- START DATE - DATE PICKER -->
                <v-col cols="6" sm="6" md="6">
                  <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="10" transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="startAvailabilityDate"
                        label="Start date"
                        prepend-icon="mdi-calendar-check-outline"
                        v-bind="attrs"
                        v-on="on"
                      >
                      </v-text-field>
                    </template>
                    <v-date-picker v-model="startAvailabilityDate" @input="menu = false" no-title> </v-date-picker>
                  </v-menu>
                </v-col>
                <!-- END OF "START DATE - DATE PICKER" -->

                <!-- START OF "END DATE - DATE PICKER" -->
                <v-col cols="6" sm="6" md="6">
                  <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="-80" transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="endAvailabilityDate"
                        label="End date"
                        prepend-icon="mdi-calendar-check"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      >
                      </v-text-field>
                    </template>
                    <v-date-picker v-model="endAvailabilityDate" @input="menu2 = false" no-title> </v-date-picker>
                  </v-menu>
                </v-col>
                <!-- END OF "END DATE - DATE PICKER" -->
              </v-row>
              <!-- END OF BOTH DATE PICKERS -->

              <!-- TIME PICKER SECTION -->
              <v-row>
                <!-- START "START TIME PICKER" -->
                <v-col cols="6" sm="6" md="6">
                  <v-menu
                    ref="timemenu1"
                    v-model="timemenu1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="reoccurringStartTime"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="reoccurringStartTime"
                        label="Start Time"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      >
                      </v-text-field>
                    </template>
                    <v-time-picker
                      v-if="timemenu1"
                      v-model="reoccurringStartTime"
                      full-width
                      @click:minute="$refs.timemenu1.save(reoccurringStartTime)"
                      :allowedMinutes="allowedMinutes"
                    >
                    </v-time-picker>
                  </v-menu>
                </v-col>
                <!-- END "START TIME PICKER" -->
                <!-- START "END TIME PICKER" -->
                <v-col cols="6" sm="6" md="6">
                  <v-menu
                    ref="timemenu2"
                    v-model="timemenu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="reoccurringEndTime"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="reoccurringEndTime" label="End Time" prepend-icon="mdi-clock-time-ten" readonly v-bind="attrs" v-on="on">
                      </v-text-field>
                    </template>
                    <v-time-picker
                      v-if="timemenu2"
                      v-model="reoccurringEndTime"
                      full-width
                      @click:minute="$refs.timemenu2.save(reoccurringEndTime)"
                      :allowedMinutes="allowedMinutes"
                    >
                    </v-time-picker>
                  </v-menu>
                </v-col>
                <!-- END "END TIME PICKER" -->
              </v-row>
              <!-- END TIME PICKER SECTION -->

              <!-- START INSTRUCTOR AND STATUS SECTION -->
              <v-row>
                <v-col cols="6" md="6">
                  <v-select
                    v-model="selectedInstructor"
                    :items="instructors"
                    :item-text="'name'"
                    :item-value="'id'"
                    label="Instructor"
                    prepend-icon="mdi-shield-account-outline"
                  >
                  </v-select>
                </v-col>

                <v-col cols="6" md="6">
                  <v-select
                    v-model="selectedStatus"
                    :items="statuses"
                    item-text="abbr"
                    item-value="value"
                    return-object
                    label="Session Status"
                    prepend-icon="mdi-list-status"
                  >
                  </v-select>
                </v-col>

                <v-col cols="15" md="9">
                  <v-btn class="mr-4" @click="createSession" dark>
                    Create Session
                  </v-btn>

                  <v-btn @click="clearTopForm" dark> clear </v-btn>
                </v-col>
                <!-- END OF INSTRUCTOR AND STATUS SECTION -->
              </v-row>
            </form>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
    <!-- *** END OF TOP FORM TO CREATE SESSIONS *** -->

    <!-- *** START OF CALENDAR VIEW *** -->
    <div style="margin-top: 50px">
      <v-row class="fill-height">
        <v-col>
          <v-sheet height="64">
            <v-toolbar flat>
              <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
                Today
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click="prev">
                <v-icon small> mdi-chevron-left </v-icon>
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click="next">
                <v-icon small> mdi-chevron-right </v-icon>
              </v-btn>
              <v-toolbar-title v-if="$refs.calendar">
                {{ $refs.calendar.title }}
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-menu bottom right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                    <span>{{ typeToLabel[type] }}</span>
                    <v-icon right> mdi-menu-down </v-icon>
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
              label="hello"
              :activator="selectedElement"
              offset-x
              :nudge-left="140"
              min-width="auto"
            >
              <v-card color="grey lighten-4" min-width="350px" flat>
                <v-toolbar :color="selectedEvent.color" dark>
                  <v-btn icon>
                    <v-icon @click="selectedOpen = false">mdi-arrow-left</v-icon>
                  </v-btn>
                  <v-toolbar-title
                    v-html="'Session with ' + this.selectedEvent.i_first_name + ' ' + this.selectedEvent.i_last_name"
                  ></v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <span
                    v-html="
                      'Start Time: ' +
                        this.selectedEvent.start +
                        '<br> End time: ' +
                        this.selectedEvent.end +
                        '<br> Student ID: ' +
                        this.selectedEvent.s_student_id +
                        '<br> session_status_desc: ' +
                        this.selectedEvent.session_status_desc +
                        '<br> session_id: ' +
                        this.selectedEvent.session_id +
                        '<br> Attendance: ' +
                        this.selectedEvent.attendance
                    "
                  ></span>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="success" @click="sendInfoToForm()">
                    Edit
                    <v-icon dark right>
                      mdi-calendar-edit
                    </v-icon>
                  </v-btn>

                  <v-btn color="error" @click="deleteSessionFromDB()">
                    Delete
                    <v-icon dark right>
                      mdi-delete-alert-outline
                    </v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-col>
      </v-row>
      <p>
        <small>
          <span class="dotCancelled"></span> Cancelled Sessions <span class="dotUpNoStudent"></span> Upcoming + No Students
          <span class="dotUpYesStudent"></span> Upcoming + Student Registered <span class="dotCompleted"></span>
          Completed or Old
        </small>
      </p>
    </div>
    <!-- *** END OF CALENDAR VIEW *** -->

    <!-- *** START OF BOTTOM FORM - EDITS A SESSION *** -->
    <div class="bottomBar">
      <v-expansion-panels focusable>
        <v-expansion-panel>
          <v-expansion-panel-header class="p-2"
            >Edit Session
            <template v-slot:actions>
              <v-icon color="primary">
                $expand
              </v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="pa-4">
            <v-form @submit.prevent="submit">
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field v-model="editSessionDate" prepend-icon="mdi-calendar-check-outline" label="Session Date" :disabled="edit" outlined>
                  </v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field v-model="editSessionTime" prepend-icon="mdi-clock-time-four-outline" :disabled="edit" label="Session Time" outlined>
                  </v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-select
                    v-model="editSelectedInstructor"
                    :items="instructors"
                    :item-text="'name'"
                    :item-value="'id'"
                    label="Instructor"
                    prepend-icon="mdi-shield-account-outline"
                    :disabled="edit"
                    outlined
                  ></v-select>
                </v-col>

                <v-col cols="12" md="4">
                  <v-select
                    v-model="editSelectedStatus"
                    :items="statuses"
                    item-text="abbr"
                    item-value="value"
                    label="Session Status"
                    return-object
                    :disabled="edit"
                    prepend-icon="mdi-list-status"
                    outlined
                  ></v-select>
                </v-col>

                <v-col cols="12" md="4">
                  <v-autocomplete
                    v-model="editStudentName"
                    :items="students"
                    cache-items
                    class="mx-4"
                    flat
                    hide-no-data
                    hide-details
                    label="Student Name"
                    item-text="name"
                    outlined
                    prepend-icon="mdi-account-plus-outline"
                    :disabled="edit"
                  ></v-autocomplete>
                </v-col>

                <v-col cols="15" md="9">
                  <v-btn class="mr-4" @click="submitFormDateToDB()" dark>
                    Submit Changes
                  </v-btn>
                  <v-btn @click="clearBottomForm()" dark> clear </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <!-- *** END OF BOTTOM FORM - EDITS A SESSION *** -->

    <div class="footerBlank"></div>
  </v-container>
</template>

<script>
import AdminService from "@/services/AdminService.js";

export default {
  data: () => ({
    statuses: [
      { abbr: "Upcoming", value: 1 },
      { abbr: "Cancelled", value: 2 },
    ],
    instructors: [],
    instructor: null,
    students: [],
    edit: true,

    //EDIT form data
    editSessionDate: null,
    editSessionTime: null,
    editSelectedStatus: null,
    editStudentName: null,
    editSelectedInstructor: null,

    // CREATE form data
    startAvailabilityDate: null,
    endAvailabilityDate: null,
    reoccurringStartTime: null,
    reoccurringEndTime: null,
    selectedInstructor: null,
    selectedStatus: null,

    //variables for date picker
    menu: false,
    menu2: false,

    //variables for time picker
    timemenu1: false,
    timemenu2: false,

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
    //Color 0 - light green, Color 1 - Dark Green, Color 2 - light grey, Color 3 - red
    // blue(#2E2FFFFF) is used to double check if any sessions are not part of the color-if-session
    colors: ["#86DB86FF", "#43944FFF", "#BDBDBDFF", "#AD0000", "#2E2FFFFF"],
    msg: null,
  }),
  mounted() {
    this.$refs.calendar.checkChange();
    this.updateAdminCalenderInfo();
    this.generateListInstructor();
    this.generateListStudents();
    this.getInstructorKey();
    this.getBackInstructorKey();
  },
  methods: {
    allowedMinutes: (v) => v % 30 === 0,
    clearTopForm() {
      this.startAvailabilityDate = null;
      this.endAvailabilityDate = null;
      this.reoccurringStartTime = null;
      this.reoccurringEndTime = null;
      this.selectedInstructor = null;
      this.selectedStatus = null;
    },
    clearBottomForm() {
      this.editSessionDate = null;
      this.editSessionTime = null;
      this.editSelectedStatus = null;
      this.editStudentName = null;
      this.editSelectedInstructor = null;
    },
    sendInfoToForm() {
      this.clearBottomForm();
      this.selectedOpen = false;
      this.edit = false;
      console.log(this.selectedEvent);

      this.editSessionDate = this.selectedEvent.start.toLocaleDateString("en-us");
      this.editSessionTime = this.selectedEvent.start.toLocaleTimeString("it-IT");
      this.editSelectedStatus = this.getBackSessionStatusKey(this.selectedEvent.session_status_id);
      this.editStudentName = this.getBackStudentKey(this.selectedEvent.s_student_id);
      this.editSelectedInstructor = this.getBackInstructorKey(this.selectedEvent.instructor_id);
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
        requestAnimationFrame(() => requestAnimationFrame(() => (this.selectedOpen = true)));
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    getInstructorKey() {
      let oneG = this.instructors.filter((obj) => {
        return obj.name === this.selectedInstructor;
      });
      if (!oneG[0]) {
        return null;
      } else {
        return oneG[0].id;
      }
    },
    getBackInstructorKey(instructorID) {
      let ans = this.instructors.find((obj) => obj.id == instructorID);
      if (ans) {
        return ans;
      } else return null;
    },
    getBackStudentKey(studentID) {
      let ans = this.students.find((obj) => obj.id == studentID);
      if (ans) {
        return ans;
      } else return null;
    },
    getBackSessionStatusKey(session_status_id) {
      let ans = this.statuses.find((obj) => obj.id == session_status_id);
      if (ans) {
        return ans;
      } else return null;
    },
    //FUNCTION TO SUBMIT FORM DATA TO DB FOR UPDATE
    //will throw errors if form is not finished, also need to be async
    async submitFormDateToDB() {
      // console.log("date: " + this.editSessionDate);
      // console.log("time: " + this.editSessionTime);
      // console.log("status: " + this.editSelectedStatus.value);
      // console.log("Instructor: " + this.editSelectedInstructor.id);
      // console.log("Session ID: " + this.selectedEvent.session_id);
      // console.log("student-name: " + this.editStudentName.id);

      var startDate2 = new Date(this.editSessionDate);
      try {
        const information = {
          startDate: startDate2.getFullYear() + "-" + (startDate2.getMonth() + 1) + "-" + startDate2.getDate(),
          startTime: this.editSessionTime,
          instructor_id: this.editSelectedInstructor.id,
          session_status_id: this.editSelectedStatus.value,
          session_id: this.selectedEvent.session_id,
        };
        // tested and works, bring back after values are working fine
        const res = await AdminService.updateSessionInfo(information);
        console.log(information);
      } catch (error) {
        console.log(error);
      }
      this.privateSessions = [];
      this.updateAdminCalenderInfo();
    },
    //very buggy, might crash server side
    async deleteSessionFromDB() {
      try {
        const pass_session_id = {
          session_id: this.selectedEvent.session_id,
        };
        console.log(pass_session_id);
        // Very buggy
        // const response = await AdminService.deleteSessionFromDB(pass_session_id);
        this.selectedOpen = false;
        this.updateAdminCalenderInfo();
      } catch (error) {
        console.log(error);
      }
    },
    async generateListInstructor() {
      try {
        const res = await AdminService.listInstructors();
        var response = res;
        for (const account of response) {
          var obj = {};
          obj["id"] = account.instructor_id;
          obj["name"] = account.first_name + " " + account.last_name;
          this.instructors.push(obj);
        }
      } catch (error) {
        console.log(error);
        this.msg = error.response.data.msg;
      }
    },
    async generateListStudents() {
      try {
        const res = await AdminService.listStudents();
        var response = res;
        for (const account of response) {
          var obj = {};
          obj["id"] = account.student_id;
          obj["name"] = account.first_name + " " + account.last_name;
          this.students.push(obj);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async updateAdminCalenderInfo() {
      this.events = [];
      this.privateSessions = [];
      try {
        const response = await AdminService.viewAdminSchedule();
        for (const session_student of response) {
          var obj = {
            //name allows us to change the mini text on the event
            name: session_student.i_first_name + " " + session_student.i_last_name,
            session_id: session_student.session_id,
            session_status_id: session_student.session_status_id,
            session_status_desc: session_student.session_status_desc,
            i_first_name: session_student.i_first_name,
            i_last_name: session_student.i_last_name,
            instructor_id: session_student.instructor_id,
            s_first_name: session_student.first_name,
            s_last_name: session_student.last_name,
            s_student_id: session_student.student_id,
            attendance: session_student.attendance,
          };

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

          //Color 0 - light green, Color 1 - Dark Green, Color 2 - light grey, Color 3 - red
          if (session_student.session_status_desc == "Cancelled") {
            obj["color"] = this.colors[3];
            //red
          }
          //sessions where a student is not present but the class is upcoming
          else if (session_student.student_id == null && session_student.session_status_desc == "Upcoming") {
            obj["color"] = this.colors[2];
            //light grey
          }
          //if the session has a student and is upcoming
          else if (session_student.session_status_desc == "Upcoming") {
            obj["color"] = this.colors[0];
            //light green
          }

          //if the session is Completed
          else if (session_student.session_status_desc == "Completed") {
            obj["color"] = this.colors[1];
            //Dark Green
          }
          //if the session is Completed and the status is set to available
          else if (session_student.session_status_desc == "Completed" && session_student.attendance == 1) {
            obj["color"] = this.colors[1];
            //Dark Green
          } else {
            obj["colocr"] = this.colors[4];
            //blue
          }

          obj["timed"] = 1;

          this.privateSessions.push(obj);
        }
        //this.msg = this.privateSessions;
      } catch (error) {
        console.log(error);
        this.msg = error.response.data.msg;
      }
    },
    async createSession() {
      const startDate = new Date(this.startAvailabilityDate + ":00:00");
      const endDate = new Date(this.endAvailabilityDate + ":00:00");
      var startTime = new Date("1990-11-15 " + this.reoccurringStartTime + ":00"); //from 5AM
      var endTime = new Date("1990-11-15 " + this.reoccurringEndTime + ":00"); //to 1PM
      const indexDate = startDate;

      var minuteChecker = startTime.getMinutes();
      if (minuteChecker == 0) {
        minuteChecker = "00";
      }

      // use this variable to insert start time and date into DB
      // var insertStartTime = startTime.getHours() + ":" + minuteChecker + ":00";

      while (indexDate <= endDate) {
        var indexTime = startTime.getHours();
        while (indexTime < endTime.getHours()) {
          var insertIndexTime = indexTime + ":" + minuteChecker + ":00";
          try {
            const information = {
              startDate: indexDate.getFullYear() + "-" + (indexDate.getMonth() + 1) + "-" + indexDate.getDate(),
              startTime: insertIndexTime,
              instructor_id: this.selectedInstructor,
              session_status_id: this.selectedStatus.value,
            };
            console.log(information);
            const res = await AdminService.createNewSession(information);
          } catch (error) {
            console.log(error);
          }
          indexTime += 1;
        }
        indexDate.setDate(indexDate.getDate() + 1);
      }
      this.privateSessions = [];
      this.updateAdminCalenderInfo();
    },
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
  margin-top: 20px;
}
.bordered {
  border-left: 1px solid grey;
}
.dotCancelled {
  height: 15px;
  width: 15px;
  background-color: #ad0000;
  border-radius: 50%;
  display: inline-block;
}
.dotUpNoStudent {
  height: 15px;
  width: 15px;
  background-color: #bdbdbdff;
  border-radius: 50%;
  display: inline-block;
}
.dotUpYesStudent {
  height: 15px;
  width: 15px;
  background-color: #86db86ff;
  border-radius: 50%;
  display: inline-block;
}
.dotCompleted {
  height: 15px;
  width: 15px;
  background-color: #43944fff;
  border-radius: 50%;
  display: inline-block;
}
.footerBlank {
  height: 80px;
}
</style>
