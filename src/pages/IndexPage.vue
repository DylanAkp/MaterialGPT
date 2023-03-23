<script>
import ChatButton from "src/components/ChatButton.vue";
import TitleBar from "src/components/TitleBar.vue";
import AddChatButton from "src/components/AddChatButton.vue";

export default {
  mounted() {
    const apikey = localStorage.getItem(`api_key`);
    if (apikey === null) {
      this.$router.push({ path: "/setup" });
    }
    const chats = localStorage.getItem("chats");
    if (chats) {
      this.chats = JSON.parse(chats);
    }
  },
  components: {
    ChatButton,
    TitleBar,
    AddChatButton,
  },
  data() {
    return {
      chats: [],
      addChat: false,
      chatname: "",
      name: "",
    };
  },
  methods: {
    onAdd() {
      if (this.name === "") {
        return;
      }
      this.chats.push(this.name);
      console.log(this.name);
      localStorage.setItem("chats", JSON.stringify(this.chats));
      this.name = "";
    },
  },
};
</script>

<template>
  <TitleBar></TitleBar>
  <div v-for="chatname in chats" :key="chatname" class="chats">
    <ChatButton :chatname="chatname"></ChatButton>
  </div>
  <AddChatButton class="button" @click="addChat = true" />
  <div v-if="addChat">
    <q-dialog v-model="addChat" no-share="true" transition-show="slide-up">
      <div class="addchat">
        <h5>Create a new chat</h5>
        <input
          ref="messagebox"
          v-model="name"
          placeholder="Enter the chat name"
          class="placeholder"
        />
        <q-btn
          v-close-popup
          icon="add"
          round
          flat
          color="#242f33"
          size="15px"
          class="add-btn"
          @click="onAdd()"
        />
      </div>
    </q-dialog>
  </div>
</template>

<style>
.add-btn {
  margin: 20px;
}

.placeholder {
  display: flex;
  align-content: center;
  border-radius: 25px;
  height: 45px;
  width: 80%;
  overflow: hidden !important;
  outline: none;
  padding-left: 10px;
  color: white;
  border-width: 0px !important;
  background-color: #1a1c1e;
}

.addchat {
  bottom: 10px;
  position: fixed;
  display: flex;
  background-color: #222a2e;
  border-radius: 30px !important;
  flex-direction: column;
  align-items: center;
  height: 250px;
  width: 95%;
}

.button {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.chats {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
}
</style>
