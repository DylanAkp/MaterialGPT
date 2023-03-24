<template>
  <div></div>
</template>

<script>
import router from 'src/router';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorNotFound',
  mounted() {
    this.$router.push({ path: "/" });
  }
})
</script>
