<template>
  <div class="chat-window">
    <div class="messages" v-chat-scroll>
      <div v-for="(message, index) in messages" :key="index">
        <message :message="message" :id="id"></message>
      </div>
    </div>
    <div class="send-form">
      <message-input
        class="message-input"
        v-model="message"
        :rows="3"
        :placeholder="`Enter message`"
        v-on:enter="sendMessage()"
      ></message-input>
      <div class="control-buttons">
        <send-button class="chat-button" :title="`Send message`" v-on:send="sendMessage" :text="`Send`"></send-button>
        <stop-button class="stop-button" :title="`Stop stream`" v-if="isOwner" v-on:send="$emit('stop')">
          <stop-icon/>
        </stop-button>
      </div>
    </div>
  </div>
</template>

<script>
import Message from "./Chat/Message";
import Button from "../Base/Button";
import Textarea from "../Base/Textarea";
import StopIcon from "vue-material-design-icons/Stop.vue";

export default {

  props: ['isOwner'],

  components: {
    message: Message,
    MessageInput: Textarea,
    SendButton: Button,
    StopButton : Button,
    StopIcon: StopIcon
  },

  data() {
    return {
      room: this.$route.params.id,
      id: "",
      message: "",
      messages: []
    };
  },

  sockets: {
    chatJoin(id) {
      this.id = id;
    },

    chatMessage(message) {
      this.messages.push(message);
    }
  },

  mounted() {
    this.$socket.emit("chatJoin", this.room);
  },

  methods: {
    sendMessage() {
      this.$socket.emit("chatMessage", this.message);
      this.message = "";
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

.stop-button:hover {
  background-color: #c06a6a1a;
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

