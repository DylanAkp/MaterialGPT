<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&family=Roboto&family=Sofia+Sans:wght@200&display=swap");
body {
  font-family: "Open Sans", sans-serif;
  background-color: #1a1c1e;
  color: white;
}

html {
  scroll-behavior: smooth;
}
</style>
