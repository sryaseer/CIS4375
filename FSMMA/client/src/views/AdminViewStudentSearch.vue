<template>
  <div>
      <p class = "pageTitle">Student Information</p>
    <div id="studentSearch">
      <v-autocomplete v-model="select" :items="items" :loading="isLoading" :search-input.sync="search"
        color="white" hide-no-data hide-selected item-text="Description" item-value="API" label="Search Account"
        placeholder="Start typing to Search" prepend-icon="mdi-account-search" return-object  >
    </v-autocomplete>
    <p> {{id}} </p>
    </div>
  </div>
</template>




<script>
import AdminService from '@/services/AdminService.js';

  export default {
    name: 'AdminViewStudentSearch',
    data() {
      return {
      }
    },
    components: {
    },
    methods:{
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
