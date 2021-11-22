<template>
  <div>
    <p> Loged in, admin {{this.admin_id}}</p>

    <v-btn class="mr-4" @click="logout"> log out </v-btn>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService.js';

export default {
    name:'AdminHome',
    props:[],
    secretMessage: null,
    data (){
        return {
          admin_id: null,

        }
    },
    methods:{
      logout() {
        this.$store.dispatch('logout');
        this.$router.push('/admin-login');
      },
    },
    mounted(){

    },
    async created() {
      if (!this.$store.getters.isAdminLoggedIn) {
          this.$router.push('/admin-login');
      }
      this.admin_id = this.$store.getters.getAdmin.admin_id;
    },
}

</script>

<style scoped>

</style>
