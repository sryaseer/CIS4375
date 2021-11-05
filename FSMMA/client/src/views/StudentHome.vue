<template>
  <div id="calendar">
    <v-row>
      <v-col>
        <p> {{secretMessage}} </p>
        <v-btn class="mr-4" @click="logout"> log out </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService.js';

export default {
  name: 'StudentHome',
  components: {
  },
  data() {
    return{
      value: '',
      ready: false,
      secretMessage: '',
      }
    },
    computed: {
      cal () {
        return this.ready ? this.$refs.calendar : null
      },
      nowY () {
        return this.cal ? this.cal.timeToY(this.cal.times.now) + 'px' : '-10px'
      },
    },
    mounted () {
      this.ready = true
      this.scrollToTime()
      this.updateTime()
    },
    async created() {
      if (!this.$store.getters.isLoggedIn) {
        this.$router.push('/StudentLogin');
      }
      this.username = this.$store.getters.getUser.username;
      this.secretMessage = await AuthService.getSecretContent();
    },
    methods: {
      getCurrentTime () {
        return this.cal ? this.cal.times.now.hour * 60 + this.cal.times.now.minute : 0
      },
      scrollToTime () {
        const time = this.getCurrentTime()
        const first = Math.max(0, time - (time % 30) - 30)

        this.cal.scrollToTime(first)
      },
      updateTime () {
        setInterval(() => this.cal.updateTimes(), 60 * 1000)
      },
      logout() {
        this.$store.dispatch('logout');
        this.$router.push('/StudentLogin');
      },
    },
  }
</script>

<style scoped lang="scss">
.v-current-time {
  height: 2px;
  background-color: #ea4335;
  position: absolute;
  left: -1px;
  right: 0;
  pointer-events: none;

  &.first::before {
    content: '';
    position: absolute;
    background-color: #ea4335;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-top: -5px;
    margin-left: -6.5px;
  }
}
  p {
    text-align: center;
    font-size: 29px;
  }
  #calendar {
    width: 80%;
    margin: auto;
    padding: 20px;
  }

</style>
