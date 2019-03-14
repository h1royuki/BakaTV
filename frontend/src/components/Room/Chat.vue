<template>
  <div class="chat-window">
    <div class="messages" v-chat-scroll>
      <div v-for="message in messages" :key="message.user">
        <message :message="message" :user="user"></message>
      </div>
    </div>
    <div class="send-form">
      <message-input
        class="message-input"
        v-model="message"
        :rows="3"
        :placeholder="`Enter message`"
        v-on:send="sendMessage"
      ></message-input>
      <div class="control-buttons">
        <send-button class="chat-button" v-on:send="sendMessage" :text="`Send`"></send-button>
        <button v-on:click="$emit('stop')" class="stop-button">
          <stop-icon/>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import Message from "./Chat/Message";
import Button from "../Base/Button";
import Textarea from "../Base/Textarea";
import StopIcon from "vue-material-design-icons/Stop.vue";

export default {
  components: {
    message: Message,
    MessageInput: Textarea,
    SendButton: Button,
    StopIcon: StopIcon
  },

  data() {
    return {
      socket: io(process.env.VUE_APP_SOCKET_CHAT_URL),
      room: this.$route.params.id,
      user: "",
      message: "",
      messages: []
    };
  },

  mounted() {
    this.socket.emit("join", this.room);

    this.socket.on("join", user => {
      this.user = user;
    });

    this.socket.on("message", message => {
      this.messages.push(message);
    });

    this.socket.on("event", event => {
      this.messages.push(event);
    });
  },

  methods: {
    sendMessage() {
      this.socket.emit("message", this.message);
    }
  }
};
</script>

<style>
.messages {
  height: calc(100% - 161px);
  background: #232935;
  overflow-y: scroll;
  border-left: 1px solid #1a1f27;
  scrollbar-color: #29303c #232935;
}

.send-form {
  padding: 10px 10px 0 10px;
  height: 150px;
  background-color: #29303c;
  border-top: 1px solid #313a4a;
  display: flex;
  flex-direction: column;
}

.message-input {
  max-height: 60px;
  font-size: 16px;
}

.control-buttons {
  display: flex;
}

.stop-button {
  padding: 4px 6px 0px 7px;
  background-color: #ff6c6c1c;
  border: none;
  color: #ff6565;
}

.chat-button {
  padding: 7px 12px;
  font-size: 15px;
  padding: 7px 12px;
  font-size: 15px;
  width: 100%;
}

.messages::-webkit-scrollbar,
.messages::-webkit-scrollbar-thumb {
  background-color: #232935;
}

@media (max-width: 750px) {
  .chat-button {
    margin-left: 0;
  }
}
</style>

