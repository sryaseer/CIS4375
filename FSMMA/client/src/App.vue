<template>
  <div id="main">
    <v-app>
      <v-main>
        <TopBar/>
        <router-view/>
        <BottomBar id="bottombar"/>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue';
import BottomBar from '@/components/BottomBar.vue';

export default {
  name: 'App',
  components: { TopBar, BottomBar, },

  data: () => ({
    //
  }),
};
</script>

<style>

  #bottombar {
   position: absolute;
   left: 0;
   bottom: 0;
   width: 100%;
  }

</style>
