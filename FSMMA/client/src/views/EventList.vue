<template>
  <div> {{ events }} </div>

</template>

<script>
import EventService from '@/services/EventService.js';
export default {
  name: "EventsList",
  components: {
  },
  data() {
    return {
      event: {},
      events: []
    };
  },
  created() {
    this.getEventsData(); // NEW - call getEventData() when the instance is created
  },
  // NEW
  methods: {
    async getEventsData() {
      // NEW - Use the eventService to call the getEvents() method
      EventService.getEvents().then( (events => {
          this.$set(this, "events", events);
        }).bind(this)
      );
    }
  }
};
</script>
