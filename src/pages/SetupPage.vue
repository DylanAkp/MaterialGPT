<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SetupPage",
  data() {
    return {
      apikey: "",
    };
  },
  methods: {
    SaveApi() {
      localStorage.setItem("api_key", this.apikey);
      this.$router.push({ path: "/" });
    },
    ClearChats() {
      console.log("clear");
      const api = localStorage.getItem("api_key");
      localStorage.clear();
      localStorage.setItem("api_key", api);
      this.$router.push({ path: "/" });
    },
  },
});
</script>

<template>
  <h3 v-if="this.$route.query.settings" class="title">Settings</h3>
  <h3 v-else class="title">Setup</h3>
  <div class="input">
    <input
      ref="apibox"
      v-model="apikey"
      placeholder="API Key"
      class="placeholder"
    />
    <div>
      <div class="button" @click="SaveApi()">
        <q-icon name="save" size="23px" />
        Save settings
      </div>
    </div>
    <div v-if="this.$route.query.settings">
      <div class="button clearbtn" @click="ClearChats()">
        <q-icon name="delete" size="23px" />
        Clear Conversations
      </div>
    </div>
  </div>
</template>

<style>
.clearbtn {
  left: 20px !important;
  background-color: #601e1e !important;
}

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

.placeholder {
  display: flex;
  flex-direction: row;
  align-content: center;
  border-radius: 25px;
  height: 45px;
  width: 80%;
  overflow: hidden !important;
  outline: none;
  padding-left: 10px;
  color: white;
  border-width: 0px !important;
  background-color: #242f33;
}

.input {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
}

.title {
  font-family: "Roboto", sans-serif;
  font-size: 50px;
  align-self: center;
  margin-left: 50px;
}
</style>
