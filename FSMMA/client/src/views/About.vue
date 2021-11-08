<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-btn class="mr-4" @click="testButton()" :disabled="invalid">
      log in
    </v-btn>
  </div>
</template>

<script>
import MailService from "@/services/MailService.js";

export default {
  data() {
    return {};
  },
  methods: {
    async testButton() {
      console.log("hello world");
      try {
        const response = await MailService.MailRequest();
        console.log("inner");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
