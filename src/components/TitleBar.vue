<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    chatname: {
      type: String,
    },
  },
  methods: {
    Setup() {
      this.$router.push({ path: "/setup", query: { settings: true } });
    },
  },
});
</script>

<template>
  <div class="titlebar">
    <div>MaterialGPT</div>
    <q-icon name="settings" size="24px" @click="Setup()" />
  </div>
</template>

<style scoped>
.titlebar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 4vh;
  font-weight: bold;
  margin: 15px;
}
</style>
