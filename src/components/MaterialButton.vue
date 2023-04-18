<script>
import { ref } from "vue";
import { uid } from "quasar";
import { defineComponent } from "vue";

export default defineComponent({
name: "MaterialButton",
  props: {
    width: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
    },
    textcolor: {
      type: String,
      required: false,
    }
  },
});
</script>

<template>
  <div>
    <div class="button no-user-select pointer" :style="{ backgroundColor: this.color, color: this.textcolor}">
      <q-icon :name="this.icon" size="23px" :style="{ backgroundColor: this.color }" />
      {{ this.text }}
    </div>
  </div>
</template>

<style scoped>
.button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  user-select: none;
  background-color: #1e4c60;
  border-radius: 15px;
  height: 55px;
  color: #b0d5e8;
  width: fit-content;
  padding-left: 10px;
  padding-right: 10px;
  gap: 5px;
}

.q-placeholder {
  color: white;
}
</style>
