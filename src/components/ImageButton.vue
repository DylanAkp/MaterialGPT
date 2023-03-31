
<script>
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    onChat() {
      this.$router.push({ path: "/image"});
    },
  },
});
</script>

<template>
  <div class="box">
    <div class="box" @click="onChat()">
    <div class="icon">
      <q-icon name="image" size="xx-large" />
    </div>
    <div class="name">Image Generation</div>
    </div>
  </div>
</template>

<style scoped>

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
