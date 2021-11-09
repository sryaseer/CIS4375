<template>
  <v-container>
    <!-- Student will become <$Student> once connection to DB -->
    <p class="pageTitle">Admin Schedule a Session</p>

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
                  <v-btn
                    outlined
                    color="grey darken-2"
                    v-bind="attrs"
                    v-on="on"
                  >
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
              :activator="selectedElement"
              offset-x
            >
              <v-card color="grey lighten-4" min-width="350px" flat>
                <v-toolbar :color="selectedEvent.color" dark>
                  <v-btn icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-toolbar-title
                    v-html="selectedEvent.name"
                  ></v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card-text>
                  <span v-html="selectedEvent.details"></span>
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
      <v-row>
        <!-- left side form -->
        <v-col cols="12" md="6">
          <v-form v-model="valid" @submit.prevent="submit">
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="startAvailabilityDate"
                  label="Start Availability Date"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="endAvailabilityDate"
                  label="End Availability Date"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="reoccurringStartTime"
                  label="Reoccurring Start Time"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="reoccurringEndTime"
                  label="Reoccurring End Time"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="instructor"
                  label="Instructor"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col cols="15" md="9">
                <v-btn class="mr-4" type="submit" @click="submitFormDateToDB()">
                  submit
                </v-btn>

                <v-btn @click="clear"> clear </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>

        <!-- right side form -->
        <v-col cols="12" md="6" class="bordered">
          <v-form v-model="valid" @submit.prevent="submit">
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="sessionDate"
                  label="Session Date"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="sessionTime"
                  label="Session Time"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="instructorName"
                  label="Instructor Name"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="sessionStatus"
                  label="Session Status"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="studentName"
                  label="Student Name"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col cols="15" md="9">
                <v-btn class="mr-4" type="submit" @click="submitFormDateToDB()">
                  submit
                </v-btn>

                <v-btn @click="clear"> clear </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
      <br /><br />
    </div>

    <!-- Bottom - Buy Sessions (Image Link) -> Takes you to login/Create Student page  -->
    <div>
      <h3 class="p-2">Sessions they have attended</h3>
    </div>
  </v-container>
</template>

<script>
import AdminService from "@/services/AdminService.js";

export default {
  data: () => ({
    //form data
    sessionDate: null,
    sessionTime: null,
    instructorName: null,
    sessionStatus: null,
    studentName: null,
    // end of form data

    // left form data
    startAvailabilityDate: null,
    endAvailabilityDate: null,
    reoccurringStartTime: null,
    reoccurringEndTime: null,
    instructor: null,
    // end left form data

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
    msg: null,
    msg2: null,
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
    updateRange({ start, end }) {
      var events = [];

      for (const event in this.privateSessions) {
        console.log(this.privateSessions[event]);
        events.push({
          name: this.privateSessions[event]["session_id"],
          color: this.colors[2],
          start: this.privateSessions[event]["startDateTime"],
          end: this.privateSessions[event]["endDateTime"],
          timed: 1,
        });
      }
      this.events = events;
      console.log("events: ");
      console.log(events);
    },
  },

  async mounted() {
    this.events = [];
    try {
      const response = await AdminService.viewAdminSchedule();
      for (const session_student of response) {
        var obj = {
          session_id: session_student.session_id,
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
</style>
