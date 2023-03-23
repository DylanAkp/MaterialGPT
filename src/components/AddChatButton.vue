<script>
import { ref } from "vue";
import { uid } from "quasar";
</script>

<template>
  <div>
    <div class="button">
      <q-icon name="edit" size="23px" />
      Start a new chat
    </div>
  </div>
</template>

<style scoped>
.button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  background-color: #1e4c60;
  border-radius: 15px;
  height: 55px;
  width: 165px;
  color: #b0d5e8;
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.q-placeholder {
  color: white;
}
</style>
