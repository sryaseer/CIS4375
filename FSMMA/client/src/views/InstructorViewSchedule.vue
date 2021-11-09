<template>
  <v-container>
    <!-- Student will become <$Student> once connection to DB -->
    <p class="pageTitle">Instructor Schedule Page</p>
    <!-- Top - This is the table of all the session upcoming for this stduent -->
    <div>
      <v-row class="fill-height">
        <v-col>
          <v-sheet height="64">
            <v-toolbar flat>
              <v-switch v-model="viewCalenderSwitch">{{
                dosomething
              }}</v-switch>

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
                  <v-btn icon>
                    <v-icon @click="selectedOpen = false"
                      >mdi-arrow-left</v-icon
                    >
                  </v-btn>
                  <v-toolbar-title
                    v-html="
                      'hello ' +
                        this.selectedEvent.i_first_name +
                        ' ' +
                        this.selectedEvent.i_last_name
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
                        this.selectedEvent.start +
                        '<br> End time: ' +
                        this.selectedEvent.end +
                        '<br> Student ID: ' +
                        this.selectedEvent.student_id +
                        '<br> session_status_desc: ' +
                        this.selectedEvent.session_status_desc +
                        '<br> session_id: ' +
                        this.selectedEvent.session_id +
                        '<br> Instructor_id: ' +
                        this.selectedEvent.instructor_id
                    "
                  ></span>
                </v-card-text>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-col>
      </v-row>
    </div>

    <!-- Middle - Form (when you click on an available slot, the form will auto populate info for session)  -->

    <!-- Bottom - Buy Sessions (Image Link) -> Takes you to login/Create Student page  -->
    <div>
      <h5 class="pageTitle">Upcoming sessions for $Instrutor_Name</h5>
    </div>
  </v-container>
</template>

<script>
import AdminService from "@/services/AdminService.js";

export default {
  data() {
    return {
      // double checking if customer is the right covers
      msg: null,
      instructor_id: null,
      viewCalenderSwitch: false,
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
        "#677fb5", //taken by you (blue)
        "#8f1414", // cancelled (red)
        "#659f6f", //available in general (green)
        "#bcbcbc", //not available (grey)
      ],
    };
  },
  watch: {},
  computed: {
    dosomething() {
      //this is switch RIGHT
      if (this.viewCalenderSwitch == true) {
        this.method1();
      } //this is switch LEFT
      else if (this.viewCalenderSwitch == false) {
        this.method2();
      } else {
        return 0;
      }
    },
  },
  methods: {
    //this is switch RIGHT
    method1() {
      this.privateSessions = [];
      this.updateCalenderInfo();
    },
    //this is switch LEFT
    method2() {
      this.privateSessions = [];
      this.updateCalenderInfoStudent();
    },
    clear() {},
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
    //pop up windows
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
    // NO USE FOR THIS REGISTER BUTTON
    // async AddSession() {
    //   console.log("inside");
    //   try {
    //     const credentials = {
    //       session_id: this.selectedEvent.session_id,
    //       student_id: this.$store.getters.getUser.student_id,
    //       attandance_id: 0,
    //     };
    //     console.log("show credits:");
    //     console.log(credentials);
    //     const response = await StudentService.SignupStudentSchedule(
    //       credentials
    //     );
    //     this.selectedOpen = false;
    //     this.updateCalenderInfo();
    //     console.log("went to back end"); //delete
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // HAVE NO USE FOR THE CANCEL BUTTON
    // async cancelSession() {
    //   console.log("credentials set up");
    //   try {
    //     const credentials = {
    //       session_id: this.selectedEvent.session_id,
    //       student_id: this.$store.getters.getUser.student_id,
    //     };
    //     console.log(credentials);
    //     const response = await StudentService.studentCancelSignUp(credentials);

    //     const information = {
    //       student_id: this.$store.getters.getUser.student_id,
    //       notes:
    //         "Session (" +
    //         this.selectedEvent.start.toLocaleDateString("en-us") +
    //         " " +
    //         this.selectedEvent.start.toLocaleTimeString("it-IT") +
    //         ") was Cancelled by Student",
    //     };
    //     const response2 = await StudentService.studentAddNotes(information);
    //     this.selectedOpen = false;
    //     this.updateCalenderInfo();
    //     this.selectedOpen = false;
    //     // this.updateCalenderInfo();
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    //this is switch RIGHT
    async updateCalenderInfo() {
      this.events = [];
      try {
        const credentials = {
          instructor_id: this.$store.state.admin.admin_id,
        };
        //pulling all the session for the instructor (disregarding if signed up or not)
        console.log("RIGHT-store info: " + this.$store.state.admin.admin_id);
        console.log("instructor: " + this.instructor_id);
        console.log("cred: " + credentials.instructor_id);
        const response = await AdminService.viewInstructorSchedule(
          credentials
        );
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

          //if session is cancelled

          if (session_student.session_status_desc == "Cancelled") {
            obj["color"] = this.colors[1];
            //red
          }
          //if the session has a student and is upcoming
          else if (
            session_student.student_id == this.$store.getters.getUser.student_id
          ) {
            obj["color"] = this.colors[0];
            obj["buttonCancel"] = true;
            //blue
          }
          //if the session is Completed
          else if (session_student.session_status_desc == "Completed") {
            obj["color"] = this.colors[3];
            //grey
          }
          //avaliable session
          else if (
            session_student.student_id == null &&
            session_student.session_status_desc == "Upcoming"
          ) {
            obj["color"] = this.colors[2];
            obj["buttonRegister"] = true;
            //green
          } else if (
            session_student.student_id != null &&
            session_student.session_status_desc == "Upcoming"
          ) {
            obj["color"] = this.colors[3];
            //grey
          } else {
            obj["colocr"] = this.colors[3];
            //grey
          }
          obj["color"] = this.colors[2];
          obj["timed"] = 1;

          // finished object
          this.privateSessions.push(obj);
        }
        //this.msg = this.privateSessions;
      } catch (error) {
        console.log(error);
        this.msg = error.response.data.msg;
      }
    },
    //this is switch LEFT
    async updateCalenderInfoStudent() {
      //   this.loginInstructor_id = this.$store.getters.getUser.student_id;
      //   console.log(this.loginInstructor_id);
      this.events = [];
      try {
        const credentials = {
          instructor_id: this.$store.getters.getAdmin.admin_id,
        };
        console.log("LEFT-store info: " + this.$store.getters.getAdmin.admin_id);
        console.log("instructor: " + this.instructor_id);
        //pulling all the session for the instructor where student's signed up
        const response = await AdminService.viewInstructorWithStudentSchedule(
          credentials
        );
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

          //if session is cancelled

          //   if (session_student.session_status_desc == "Cancelled") {
          //     obj["color"] = this.colors[1];
          //     //red
          //   }
          //   //if the session has a student and is upcoming
          //   else if (
          //     session_student.student_id == this.$store.getters.getUser.student_id
          //   ) {
          //     obj["color"] = this.colors[0];
          //     obj["buttonCancel"] = true;
          //     //blue
          //   }
          //   //if the session is Completed
          //   else if (session_student.session_status_desc == "Completed") {
          //     obj["color"] = this.colors[3];
          //     //grey
          //   }
          //   //avaliable session
          //   else if (
          //     session_student.student_id == null &&
          //     session_student.session_status_desc == "Upcoming"
          //   ) {
          //     obj["color"] = this.colors[2];
          //     obj["buttonRegister"] = true;
          //     //green
          //   } else if (
          //     session_student.student_id != null &&
          //     session_student.session_status_desc == "Upcoming"
          //   ) {
          //     obj["color"] = this.colors[3];
          //     //grey
          //   } else {
          //     obj["colocr"] = this.colors[3];
          //     //grey
          //   }
          obj["color"] = this.colors[2];
          obj["timed"] = 1;

          // finished object
          this.privateSessions.push(obj);
        }
        //this.msg = this.privateSessions;
      } catch (error) {
        console.log(error);
        this.msg = error.response.data.msg;
      }
    },
  },

  async mounted() {
    
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
