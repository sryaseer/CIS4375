<template>
  <v-app-bar color="black" dense>
    <v-spacer></v-spacer>
    <v-menu>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="admin-menu" color="black" dark v-bind="attrs" v-on="on">
          FS MMA Private Sessions
        </v-btn>
      </template>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: "BottomBar",
  props: {},
  data: () => ({
    items: [
    ],
  }),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#admin-logo {
  display: block;
  padding-left: 300px;
}
.menu-links {
  text-decoration: none;
  color: navy;
}
</style>
