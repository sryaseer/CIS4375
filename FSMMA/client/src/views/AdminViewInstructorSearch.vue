<template>
  <div class="ma-5 pa-5">
      <p class = "pageTitle">Instructor Information</p>
    <div id="instructorSearch">
      <v-autocomplete v-model="instructor" :items="instructors" :item-text="'name'" :loading="isLoading" :search-input.sync="search"
        color="white" hide-no-data hide-selected item-value="name" label="Search Account"
        placeholder="Start typing to Search" prepend-icon="mdi-account-search" return-object  >

        <template v-slot:item="{ item }">
          <v-list-item link :to="'viewinstructor/' + item.id">{{item.name}}</v-list-item>
        </template>
    </v-autocomplete>
    </div>
  </div>
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
      instructors: [
        {id: 1, name: 'Isaac Newton', dob: '1 Jan 1970'},
        {id: 2, name: 'Albert Einstein', dob: '1 Jan 1970'},
        {id: 3, name: 'Nikola Tesla', dob: '1 Jan 1970'},
        {id: 4, name: 'Galileo ', dob: '1 Jan 1970'},
      ]
      }
    },
    async mounted() {
      
    },
    methods:{
      logout() {
        this.$store.dispatch('logout');
        this.$router.push('/adminlogin');
      },
    },
    async created() {
      if (!this.$store.getters.isAdminLoggedIn) {
          this.$router.push('/adminlogin');
      }
    },
  }

</script>




<style>
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
