<template>
  <v-container>
    <!-- Student will become <$Student> once connection to DB -->
    <p class="pageTitle">Admin Create Sessions</p>

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
            <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x :nudge-left="140" min-width="auto">
              <v-card color="grey lighten-4" min-width="350px" flat>
                <v-toolbar :color="selectedEvent.color" dark>
                  <v-btn icon>
                    <v-icon @click="selectedOpen = false">mdi-arrow-left</v-icon>
                  </v-btn>
                  <v-toolbar-title v-html="'placeholder name'"></v-toolbar-title>
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
                        this.selectedEvent.session_id
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
    colors: ["blue", "indigo", "deep-purple", "cyan", "green", "orange", "grey darken-1"],
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
      this.selectedInstructor = null;
    },
    sendInfoToForm() {
      this.selectedOpen = false;
      this.edit = false;
      console.log(this.selectedEvent);

      this.editSessionDate = this.selectedEvent.start.toLocaleDateString("en-us");
      this.editSessionTime = this.selectedEvent.start.toLocaleTimeString("it-IT");
      this.editSelectedStatus = this.selectedEvent.session_status_id;
      this.editStudentName = this.s_first_name + " " + this.s_last_name;
      this.editSelectedInstructor = this.selectedInstructor;
    },
    submitFormDateToDB() {
      console.log("date:" + this.editSessionDate);
      console.log("time:" + this.editSessionTime);
      console.log("status:" + this.editSelectedStatus);
      console.log("student name:" + this.editStudentName);
      console.log("Instructor:" + this.editSelectedInstructor);

      this.editSelectedInstructor.value === this.selectedInstructor["id"];
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
    //very buggy, might crash server side
    async deleteSessionFromDB() {
      try {
        console.log("hello");
        const pass_session_id = {
          session_id: this.selectedEvent.session_id,
        };
        console.log(pass_session_id);
        const response = await AdminService.deleteSessionFromDB(pass_session_id);
        this.selectedOpen = false;
        this.updateAdminCalenderInfo();
      } catch (error) {
        console.log(error);
      }
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
    getBackInstructorKey() {
      let oneG = this.instructors.filter((obj) => {
        return obj.id === this.selectedInstructor;
      });
      if (!oneG[0]) {
        return null;
      } else {
        return oneG[0].id;
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
          obj["id"] = account.studen_id;
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
            session_id: session_student.session_id,
            session_status_id: session_student.session_status_id,
            session_status_desc: session_student.session_status_desc,
            i_first_name: session_student.i_first_name,
            i_last_name: session_student.i_last_name,
            instructor_id: session_student.instructor_id,
            s_first_name: session_student.first_name,
            s_last_name: session_student.last_name,
            s_student_id: session_student.student_id,
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
    //FUNCTION TO SUBMIT FORM DATA TO DB FOR UPDATE
    //tied to a submit button so will throw errors if form is not finished
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

.footerBlank {
  height: 80px;
}
</style>
