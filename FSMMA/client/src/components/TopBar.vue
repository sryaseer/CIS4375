<template>
  <div>
    <!-- TOP BAR -->
    <v-app-bar color="black" dense>
          <v-btn color="black" dark @click.stop="drawer = !drawer" >
            <v-icon> {{this.menuIcon}} </v-icon> MENU
          </v-btn>
      <v-spacer></v-spacer>
        <v-toolbar-title class="atext">
           <p>FS MMA PRIVATE SESSIONS</p>
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title class="btext">
        <a class="phonelink" href="tel:1-281-861-5430"> (281) 861-5430 </a>
      </v-toolbar-title>
    </v-app-bar>
    <!-- END OF TOP BAR -->

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-content v-if="this.student_name != null">
          <v-list-item-title>{{this.student_name}}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-content v-else-if="this.admin_name != null">
          <v-list-item-title>{{this.admin_name}}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-content v-else>
          <v-list-item-title>LOGIN</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense v-if="this.student_name">
        <v-list-item v-for="item in studentItems" :key="item.title" :to="item.link" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense v-else-if="this.admin_name">
        <p class="submenutitle"> ADMIN TOOLS </p>
        <v-list-item v-for="item in adminTools" :key="item.title" :to="item.link" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <p class="submenutitle"> STUDENT TOOLS </p>

        <v-list-item v-for="item in adminStudentTools" :key="item.title" :to="item.link" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <p class="submenutitle"> INSTRUCTOR TOOLS </p>
        <v-list-item v-for="item in adminInstructorTools" :key="item.title" :to="item.link" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>

      <v-list dense v-else>
        <v-list-item v-for="item in defaultItems" :key="item.title" :to="item.link" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <div class="adminloginsub"> </div>

        <v-list-item v-for="item in adminLoginItems" :key="item.title" :to="item.link" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>
  </div>
</template>

<script>

export default {
  name: "TopBar",
  props: {},
  data: () => ({
    studentItems: [
      { title: "Home", icon: 'mdi-home-outline', link: "/student-home"},
      { title: "Schedule Session", icon: 'mdi-calendar', link: "/student-schedule-page" },
      { title: "Purchase Sessions", icon: 'mdi-cart-heart', link: "/student-buy-session" },
      { title: "Health History", icon: 'mdi-clipboard-text-clock-outline', link: "/student-history" },
      { title: "Account Info", icon: 'mdi-badge-account-horizontal-outline', link: "/student-information" },
      { title: "Login/Logout", icon: 'mdi-logout', link: "/student-login" },
    ],

    adminTools:[
        { title: "Admin Home", icon: 'mdi-home-outline', link: "/admin-home" },
        { title: "Admin Schedule", icon: 'mdi-calendar-cursor', link: "/admin-schedule" },
        { title: "Login/Logout", icon: 'mdi-logout', link: "/admin-login" },
      ],

    adminStudentTools: [
      { title: "View Student", icon: 'mdi-account-search', link: "/admin-view-student-search" },
    ],

    adminInstructorTools: [
      { title: "Instructor Schedule", icon: 'mdi-calendar-range-outline', link: "/instructor-schedule" },
      { title: "View Instructor", icon: 'mdi-shield-account-outline', link: "/admin-view-instructor-search" },
      { title: "Create Instructor", icon: 'mdi-account-multiple-plus-outline', link: "/instructor-create-account" },
    ],

    defaultItems: [
      { title: "Home", icon: 'mdi-home', link: "/"},
      { title: "Login/Logout", icon: 'mdi-logout', link: "/student-login" },
    ],

    adminLoginItems: [
      { title: "Admin", link: "/admin-login" },
      { title: "Instructor", link: "/test" },
    ],
    drawer: null,
    menuIcon: 'mdi-menu',
  }),
  computed: {
    student_name() {
      if (this.$store.getters.isLoggedIn && this.$store.getters.isLoggedIn != ""){
        return (this.$store.getters.getUser.first_name + " " + this.$store.getters.getUser.last_name);}
      else {return null;}
    },
    admin_name() {
      if (this.$store.getters.isAdminLoggedIn && this.$store.getters.isAdminLoggedIn != ""){
        return (this.$store.getters.getAdmin.first_name + " " + this.$store.getters.getAdmin.last_name);}
        else {return null;}
      }
  },
};
</script>

<style scoped>
.atext {
  padding-top: 18px;
  color: white;
  font-size: small;
}

.btext {
  color: white;
  font-size: small;
}

.menu-links {
  text-decoration: none;
  color: navy;
}

.phonelink {
  text-decoration: none;
  color: white;
}

.submenutitle{
  padding-left: 12px;
  padding-top: 20px;
  font-size: 10px;
}

.adminloginsub{
  margin: 400px;
}
</style>
