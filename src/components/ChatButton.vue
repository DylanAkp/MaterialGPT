
<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    chatname: {
      type: String,
    },
    sysprompt: {
      type: String,
    },
  },
  methods: {
    onChat() {
      this.$router.push({ path: "/chat", query: { chatname: this.chatname }});
    },
    onDelete() {
      this.$emit("delete", this.chatname);
    },
  },
});
</script>

<template>
  <div  class="box">
    <div class="box" @click="onChat()">
    <div class="icon">
      <q-icon name="smart_toy" size="xx-large" />
    </div>
    <div class="name">{{ chatname }}</div>
    </div>
    <q-icon name="delete" size="x-large" class="delete-button" @click="onDelete"></q-icon>
  </div>
</template>

<style scoped>

.delete-button {
  color: #601e1e;
  height: 45px;
  width: 45px;
  margin: 20px;
}
.name {
  font-size: large;
}
.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1e4c60;
  color: #b0d5e8;
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
