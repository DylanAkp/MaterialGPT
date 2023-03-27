<script>
import { ref } from "vue";
import { uid } from "quasar";
</script>

<template>
  <div>
    <div class="button">
      <q-icon name="upgrade" size="23px" />
      Update
    </div>
  </div>
</template>

<style scoped>
.button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  background-color: #605d1e;
  border-radius: 15px;
  height: 55px;
  width: 120px;
  color: #b0d5e8;
  position: fixed;
  bottom: 20px;
  left: 20px;
}

.q-placeholder {
  color: white;
}
</style>
