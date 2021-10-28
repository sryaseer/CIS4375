<template>
  <v-app-bar color="black" dense>
    <v-spacer></v-spacer>
    <v-menu>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="admin-menu" color="black" dark v-bind="attrs" v-on="on">
          FS MMA Private Sessions
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index">
          <a class="menu-links" v-bind:href="item.link"> {{ item.title}} </a>
        </v-list-item>
      </v-list>
    </v-menu>

  </v-app-bar>
</template>

<script>
export default {
  name: 'BottomBar',
  props: {
  },
  data: () => ({
    items: [
      {title: 'Admin Home', link: '/'},
      {title: 'Admin Schedule', link: '/'},
      {title: 'Admin View Student', link: '/adminviewstudent'},
      {title: 'Admin Login', link: '/adminlogin'},
    ],
  }),
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  #admin-logo {
    display: block;
    padding-left: 300px;
  }

</style>
