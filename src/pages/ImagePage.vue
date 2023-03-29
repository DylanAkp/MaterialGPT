
<script>
import { defineComponent, ref } from "vue";
import axios from "axios";
import LoadingDots from "src/components/LoadingDots.vue";
import { openURL } from 'quasar';

export default defineComponent({
  mounted() {
    const chatname = "Image Generation";
    this.chatname = chatname;
    const messages = localStorage.getItem(`messages-${chatname}`);
    if (messages) {
      this.messages = JSON.parse(messages);
    }
  },

  data() {
    return {
      loading: false,
      messages: [],
      chatname: "",
      message: "",
    };
  },

  components: {
    LoadingDots,
  },

  methods: {
    async generateAnswer(message) {
      this.loading = true;
      const api_key = localStorage.getItem(`api_key`);
      try {
        const response = await axios.post(
          "https://api.openai.com/v1/images/generations",
          {
            prompt: message,
          },
          {
            headers: {
              Authorization: `Bearer ${api_key}`,
              "Content-Type": "application/json",
            },
          }
        );
        this.loading = false;
        this.messageId++;
        this.messages.push({
          id: this.messageId,
          role: "assistant",
          content: response.data.data[0].url,
        });
        localStorage.setItem(
          `messages-${this.chatname}`,
          JSON.stringify(this.messages)
        );
      } catch (error) {
        this.loading = false;
        this.messageId++;
        this.messages.push({
          id: this.messageId,
          role: "application",
          content: "Not sent",
        });
        localStorage.setItem(
          `messages-${this.chatname}`,
          JSON.stringify(this.messages)
        );
      }
    },
    onDownload(link) {
      openURL(link);
    },
    onBack() {
      this.$router.push("/");
    },
    async onSend() {
      if (this.message) {
        this.messages.push({
          id: this.messageId,
          role: "user",
          content: this.message,
        });
        this.messageId++;

        localStorage.setItem(
          `messages-${this.chatname}`,
          JSON.stringify(this.messages)
        );
        this.request = this.message;
        this.message = "";
        this.$refs.messagebox.value = "";
        await this.generateAnswer(this.request);
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth"
        });
      }
    },
  },
});
</script>

<template>
  <div class="titlebar">
    <q-icon
      @click="onBack"
      style="padding: 10px"
      name="arrow_back"
      color="white"
      size="24px"
    ></q-icon>
    <div>{{ this.chatname }}</div>
  </div>


  <div class="chat">
    <div v-for="message in messages" :key="message.id" class="messages">
      <div v-if="message.role === 'user'" class="message">
        {{ message.content }}
      </div>
      <div v-if="message.role == 'assistant'" class="message openai">
        <img class="img" :src="message.content" style="max-width: 256px; max-height: 256px;"/>
      </div>
      <div v-if="message.role == 'assistant'" class="message openai">
        <div class="button" @click="onDownload(message.content)">
          <q-icon name="download" size="23px" />
          Download
        </div>
      </div>
      <div v-if="message.role == 'application'" class="application">{{ message.content }}</div>
    </div>
  </div>


  <div class="sendmessage">
    <LoadingDots v-if="this.loading" class="loading"></LoadingDots>
    <input
      ref="messagebox"
      v-model="message"
      placeholder="Describe your image"
      class="placeholder"
    />
    <q-btn v-if="!this.loading"
      icon="send"
      round
      flat
      color="#242f33"
      size="15px"
      class="send-btn"
      @click="onSend"
    />
    <q-btn v-else
      icon="pending"
      round
      flat
      color="#242f33"
      size="15px"
      class="send-btn"
    />
  </div>
</template>

<style scoped>

.loading {
  position: fixed;
  bottom: 35px;
}
.chat {
  padding-top: 50px;
  padding-bottom: 60px;
}
.messages {
  display: flex;
  flex-direction: column;
}
.message {
  align-self: flex-end;
  width: fit-content;
  height: fit-content;
  word-wrap: break-word;
  max-width: 95vw;
  background-color: #1e4c60;
  margin: 5px;
  padding: 10px;
  border-radius: 20px;
  color: white;
}

.button {
  user-select: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  background-color: #1e4c60;
  border-radius: 15px;
  height: 55px;
  width: 165px;
  color: #b0d5e8;
}

.img {
  border-radius: 20px;
}

.application {
  align-self: flex-end;
  margin-right: 10px;
  color: #800b32;
  background-color: #00000000;
}

.model {
  align-self: center;
  color: grey;
  background-color: #00000000;
}

.openai {
  align-self: flex-start;
  background-color: #262f33;
}
.input {
  color: white;
}

.send-btn {
  background-color: #242f33;
  color: #b0d5e8;
  right: 5px;
}

.sendmessage {
  display: flex;
  flex-direction: row;
  background-color: #1a1c1e;
  width: 100vw;
  bottom:0px;
  padding-bottom: 10px;
  padding-top: 10px;
  position: fixed;
}

.placeholder {
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: row;
  align-content: center;
  border-radius: 25px;
  margin-left: 10px;
  margin-right: 10px;
  width: 100%;
  overflow: hidden !important;
  outline: none;
  color: white;
  border-width: 0px !important;
  background-color: #242f33;
}

.titlebar {
  display: flex;
  font-size: large;
  flex-direction: row;
  align-items: center;
  background-color: #1a1c1ef9;
  height: 45px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}

</style>
