<template>
  <v-container>
    <!-- Student will become <$Student> once connection to DB -->
    <h3>Mysss Schedule Page</h3>

    <!-- Top - This is the table of all the session upcoming for this stduent -->
    <div>
      <h3 class="p-2">Table of all schedule</h3>
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
              :events="events"
              :event-color="getEventColor"
              :type="type"
              @click:event="showEvent"
              @click:more="viewDay"
              @click:date="viewDay"
              @change="updateRange"
            ></v-calendar>
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
      <h3 class="p-2">sessions they have attended</h3>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    //form data
    sessionDate: null,
    sessionTime: null,
    instructorName: null,
    sessionStatus: null,
    studentName: null,
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party",
    ],

    //data coming from the DB

    // end of form data
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
    events: [],
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
    // updateRange({ start, end }) {
    //   const events = [];
    //
    //   const min = new Date(`${start.date}T00:00:00`);
    //   const max = new Date(`${end.date}T23:59:59`);
    //   const days = (max.getTime() - min.getTime()) / 86400000;
    //   const eventCount = this.rnd(days, days + 20);
    //
    //   for (let i = 0; i < eventCount; i++) {
    //     const allDay = this.rnd(0, 3) === 0;
    //     const firstTimestamp = this.rnd(min.getTime(), max.getTime());
    //     const first = new Date(firstTimestamp - (firstTimestamp % 900000));
    //     const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
    //     const second = new Date(first.getTime() + secondTimestamp);
    //
    //     events.push({
    //       name: this.names[this.rnd(0, this.names.length - 1)],
    //       start: first,
    //       end: second,
    //       color: this.colors[this.rnd(0, this.colors.length - 1)],
    //       timed: !allDay,
    //     });
    //   }
    //
    //   this.events = events;
    // },
    updateRange({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        // const allDay = this.rnd(0, 3) === 0;
        // const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        // const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        // const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        // const second = new Date(first.getTime() + secondTimestamp);

        // making our own dummy data to enter into
        var year = "2021";
        var month = "10";
        var day = i;
        var today = new Date(year, month, i, 17, 0, 0);
        //var ourtime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds;

        var tomorrow = new Date(year, month, i, 18, 0, 0);

        events.push({
          //   date: today,
          name: "alex is the best",
          //time: ourtime,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          //   name: this.names[this.rnd(0, this.names.length - 1)],
          start: today,
          end: tomorrow,
          //   timed: !allDay,
        });
      }
      this.events = events;
      // set the date, start time and end time.
      // when it pulls from db, it always start time, we have logically add 1hr to it.
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    sendInfoToForm() {
      this.sessionDate = this.selectedEvent.start; //this.selectedEvent.date
      this.sessionTime = this.selectedEvent.time; //this.selectedEvent.time
      this.instructorName = this.selectedEvent.name; //this.selectedEvent.instructorName
      this.sessionStatus = null; //this.selectedEvent.sessionStatus
      this.studentName = null; //this.selectedEvent.studentName
      // this.studentID
    },
    submitFormDateToDB() {
      console.log("hello world");
    },
  },
};
</script>

<style scoped>
h3 {
  text-align: center;
}
.bottomBar {
  margin: auto;
  width: 50%;
  height: 50%;
}
</style>
