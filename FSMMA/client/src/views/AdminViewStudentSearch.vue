<template>
  <div class="ma-5 pa-5">
      <p class = "pageTitle">Student Information</p>
    <div id="studentSearch">
      <v-autocomplete v-model="account" :items="accounts" :item-text="'name'" :loading="isLoading" :search-input.sync="search"
        color="white" hide-no-data hide-selected item-value="name" label="Search Account"
        placeholder="Start typing to Search" prepend-icon="mdi-account-search" return-object  >

        <template v-slot:item="{ item }">
          <v-list-item link :to="'admin-view-student/' + item.id">{{item.name}}</v-list-item>
        </template>
    </v-autocomplete>
    </div>
  </div>
</template>




<script>
import AdminService from '@/services/AdminService.js';
import AuthService from '@/services/AuthService.js';

  export default {
    name: 'AdminViewStudentSearch',
    data() {
      return {
      isLoading: false,
      model: null,
      search: null,
      accounts: [],
      account: null,
      msg: null,
      }
    },
    async mounted() {
      this.isLoading = true;
      try {
        const res = await AdminService.listStudents();
        var response = res;
        //this.msg = res;
        for (const account of response){
          var obj = {};
          obj['id'] = account.student_id;
          obj['name'] = account.first_name + " " + account.last_name;
          obj['dob'] = new Date(account.dob).toLocaleDateString("en-US");
          this.accounts.push(obj);
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
