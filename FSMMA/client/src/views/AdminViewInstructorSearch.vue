<template>
  <v-container>
      <p style="text-align: center; font-size: 18px;">INSTRUCTOR SEARCH</p>
    <div id="instructorSearch">
      <v-autocomplete v-model="instructor" :items="instructors" :item-text="'name'" :loading="isLoading" :search-input.sync="search"
        color="white" hide-no-data hide-selected item-value="name" label="Search Instructor"
        placeholder="Start typing to Search" prepend-icon="mdi-account-search" return-object  >

        <template v-slot:item="{ item }">
          <v-list-item link :to="'view-instructor/' + item.id">{{item.name}}</v-list-item>
        </template>
    </v-autocomplete>
    </div>
  </v-container>
</template>




<script>
import AdminService from '@/services/AdminService.js';
import AuthService from '@/services/AuthService.js';

  export default {
    name: 'AdminViewInstructorSearch',
    data() {
      return {
      isLoading: false,
      model: null,
      search: null,
      instructor: null,
      msg: null,
      instructors: [],
      }
    },
    async mounted() {
      this.isLoading = true;
      try {
        const res = await AdminService.listInstructors();
        var response = res;
        //this.msg = res;
        for (const account of response){
          var obj = {};
          obj['id'] = account.instructor_id;
          obj['name'] = account.first_name + " " + account.last_name;
          obj['dob'] = new Date(account.dob).toLocaleDateString("en-US");
          this.instructors.push(obj);
        }
        this.msg = this.accounts;
      } catch (error) {
        console.log(error);
        this.msg = error.response.data.msg;
      }
      this.isLoading = false;
    },
    methods:{
      logout() {
        this.$store.dispatch('logout');
        this.$router.push('/admin-login');
      },
    },
    async created() {
      if (!this.$store.getters.isAdminLoggedIn) {
          this.$router.push('/admin-login');
      }
    },
  }

</script>




<style scoped>
#studentSearch{
  max-width: 70%;
  min-width: 60%;
  margin: auto;
}

.pageTitle {
  text-align: center;
  font-size: 25px;
}


</style>
