<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    chatname: {
      type: String,
    },
  },
  methods: {
    onChat() {
      this.$router.push({ path: "/chat", query: { chatname: this.chatname }});
    },
  },
});
</script>

<template>
  <div class="box" @click="onChat()">
    <div class="icon"></div>
    <div class="name">{{ chatname }}</div>
  </div>
</template>

<style scoped>
.name {
  font-size: large;
}
.icon {
  background-color: #ffff;
  border-radius: 50%;
  height: 45px;
  width: 45px;
  margin: 20px;
}

.box:hover {
  background-color: #37373a;
}
.box {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 70px;
  width: 95%;
  border-radius: 15px;
}
</style>
