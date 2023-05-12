<script>
import ChatButton from "src/components/ChatButton.vue";
import TitleBar from "src/components/TitleBar.vue";
import axios from 'axios';
import { openURL } from 'quasar';
import MaterialButton from "src/components/MaterialButton.vue";

export default {
  async mounted() {
    const apikey = localStorage.getItem(`api_key`);
    if (apikey === null) {
      this.$router.push({ path: "/setup" });
    }
    const chats = localStorage.getItem("chats");
    if (chats) {
      this.chats = JSON.parse(chats);
    }
    await this.checkForUpdates();
  },
  components: {
    ChatButton,
    TitleBar,
    MaterialButton
},
  data() {
    return {
      showImage: "",
      chats: [],
      addChat: false,
      chatname: "",
      name: "",
      sysprompt: "",
      update: false,
    };
  },
  methods: {
    onDeleteChat (chatname) {
      this.chats = this.chats.filter((chat) => chat !== chatname);
      localStorage.setItem("chats", JSON.stringify(this.chats));
      localStorage.removeItem(`messages-${chatname}`);
    },
    onUpdate() {
      openURL("https://github.com/DylanAkp/MaterialGPT/releases/latest");
    },
    onAddChat() {
      if (this.name === "") {
        return;
      }
      this.chats.push(this.name);
      localStorage.setItem("chats", JSON.stringify(this.chats));
      if (this.sysprompt === "") {
        this.sysprompt = "Your name is MaterialGPT, you're an helpful assistant";
      }
      localStorage.setItem(`sysprompt-${this.name}`, this.sysprompt);
      this.name = "";
      this.sysprompt = "";
      this.addChat = false;
    },
    compareVersions(v1, v2) {
      const v1Parts = v1.split('.').map(Number);
      const v2Parts = v2.split('.').map(Number);

      for (let i = 0; i < v1Parts.length; i++) {
          if (v1Parts[i] > v2Parts[i]) {
            return 1;
          } else if (v1Parts[i] < v2Parts[i]) {
            return -1;
          }
      }
      return 0;
    },
    async checkForUpdates() {
      try {
        const response = await axios.get(
          'https://api.github.com/repos/DylanAkp/MaterialGPT/releases'
        );
        const releases = response.data;
        if (releases && releases.length > 0) {
          const currentVersion = '2.3.0';
          const latestRelease = releases[0];
          const latestVersion = latestRelease.tag_name
          if (this.compareVersions(latestVersion, currentVersion) > 0) {
            this.update = true;
          }
        }
      }
      catch (error) {
        console.log(error);
      }
    },
  }
};
</script>

<template>
  <div class="index">
    <TitleBar></TitleBar>
    <div class="chats no-select-text" v-for="chatname in chats" :key="chatname">
      <ChatButton class="no-select-text pointer tile" :chatname="chatname" :sysprompt="sysprompt" @delete="onDeleteChat"/>
    </div>
    <MaterialButton icon="edit" text="Start a new chat" class="bottom-right-btn" @click="addChat = true" />
    <MaterialButton v-if="update" icon="upgrade" text="Update" color="#605d1e" textcolor="#d0c93e" class="update" @click="onUpdate"/>
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
            <input
              ref="messagebox"
              v-model="sysprompt"
              placeholder="Enter the system prompt (optional)"
              class="placeholder"
            />
            <div class="create-btn no-select-test pointer">
              <MaterialButton icon="add" text="Create" @click="onAddChat()" />
            </div>
          </div>
        </q-dialog>
    </div>
  </div>
</template>

<style scoped>
.create-btn {
  margin: 20px;
}
.index {
  background-color: #2a2b2e;
}

.index:not(ChatButton, TitleBar) {
  width: 100%;
  height: 100vh;
}

.bottom-btn {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding-top: 20px;
  width: 100%;
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
  margin-top: 10px;
  margin-bottom: 10px;
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
  width: 95%;
}

.update {
  position: fixed;
  bottom: 20px;
  left: 20px;
}

.chats {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
  width: 100%;
}
</style>
