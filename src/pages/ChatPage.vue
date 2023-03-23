<script>
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  mounted() {
    const chatname = this.$route.query.chatname;
    this.chatname = chatname;
    const messages = localStorage.getItem(`messages-${chatname}`);
    if (messages) {
      this.messages = JSON.parse(messages);
    }
  },
  data() {
    return {
      chatname: "",
      message: "",
      messages: [],
      messageId: 1,
      request: "",
    };
  },
  methods: {
    async generateAnswer(message) {
      const api_key = localStorage.getItem(`api_key`);
      try {
        const messages = this.messages.map((message) => {
          return {
            role: message.role,
            content: message.content,
          };
        });
        messages.push({
          role: "user",
          content: message,
        });

        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: messages,
          },
          {
            headers: {
              Authorization: `Bearer ${api_key}`,
              "Content-Type": "application/json",
            },
          }
        );

        this.messageId++;
        this.messages.push({
          id: this.messageId,
          role: "assistant",
          content: response.data.choices[0].message.content,
        });
        localStorage.setItem(
          `messages-${this.chatname}`,
          JSON.stringify(this.messages)
        );
        this.messageId++;
      } catch (error) {
        console.log(error);
      }
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
      <div v-else class="message openai">{{ message.content }}</div>
    </div>
  </div>

  <div class="sendmessage">
    <input
      ref="messagebox"
      v-model="message"
      placeholder="Message"
      class="placeholder"
    />
    <q-btn
      icon="send"
      round
      flat
      color="#242f33"
      size="15px"
      class="send-btn"
      @click="onSend"
    />
  </div>
</template>

<style scoped>
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
  bottom: 10px;
  right: 10px;
  position: fixed;
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
  position: fixed;
  bottom: 10px;
  left: 10px;
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