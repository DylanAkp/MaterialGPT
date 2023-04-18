<script>
import MaterialButton from "src/components/MaterialButton.vue";
import { defineComponent } from "vue";
import { ref } from "vue";

export default defineComponent({
    name: "SetupPage",
    data() {
        const imageref = localStorage.getItem("image");
        if (imageref === null) {
            localStorage.setItem("image", "true");
        }
        return {
            apikey: "",
            image: ref(imageref === "true"),
        };
    },
    methods: {
        SwitchImage() {
            this.image = !this.image;
            localStorage.setItem("image", this.image);
        },
        SaveApi() {
            if (this.apikey != "") {
                localStorage.setItem("api_key", this.apikey);
            }
            localStorage.setItem("image", this.image);
            this.$router.push({ path: "/" });
        },
        ClearChats() {
            const image = localStorage.getItem("image");
            const api = localStorage.getItem("api_key");
            localStorage.clear();
            localStorage.setItem("api_key", api);
            localStorage.setItem("image", image);
            this.$router.push({ path: "/" });
        },
    },
    components: {
      MaterialButton,
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
      placeholder="Open API Key"
      class="placeholder"
    />
  </div>
  <div class="buttons">
    <MaterialButton v-if="this.$route.query.settings" @click="SwitchImage()" icon="image" :text="this.image ? 'Image generation (Shown)' : 'Image generation (Hidden)'" width="fit-content" />
    <MaterialButton v-if="this.$route.query.settings"
    icon="delete"
    width="165px"
    color="#601e1e"
    textcolor="pink"
    text="Clear Conversations"/>
  </div>


  <MaterialButton class="bottom-right-btn" icon="save" text="Save settings" width="fit-content" @click="SaveApi()" />
</template>

<style scoped>
.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  gap: 20px;
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
