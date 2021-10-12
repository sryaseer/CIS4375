<template>
  <v-app>
    <v-main>
      <TopBar/>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import TopBar from '@/components/TopBar.vue'

export default {
  name: 'App',
  components: { TopBar, },

  data: () => ({
    //
  }),
};
</script>
