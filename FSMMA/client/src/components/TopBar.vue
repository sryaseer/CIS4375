<template>
  <v-app-bar color="black" dense>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="black"
          dark
          v-bind="attrs"
          v-on="on">
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

    <v-spacer></v-spacer>
    <v-toolbar-title class="btext"><a class="phonelink" href="tel:1-281-861-5430">(281) 861-5430</a></v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: 'TopBar',
  props: {
  },
  data: () => ({
    items: [
        { title: 'Student Home', link: '/' },
        { title: 'Schedule Session', link: '/'},
        { title: 'Purchase Sessions', link: '/StudentBuySession'},
        { title: 'Student Login', link: '/studentlogin'},
      ],
  }),
}
</script>

<style scoped>
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


</style>
