<template>
  <div>
    <p> Loged in, admin </p>
    <p> {{secretMessage}} </p>
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
        this.$router.push('/adminlogin');
      },
    },
    mounted(){

    },
    async created() {
      if (!this.$store.getters.isAdminLoggedIn) {
          this.$router.push('/adminlogin');
      }

      this.secretMessage = await AuthService.getSecretAdminContent();
    },
}

</script>

<style>

</style>
