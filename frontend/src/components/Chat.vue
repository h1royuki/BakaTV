<template>
  <div class="chat-window">
    <online-users/>
    <div class="messages" v-chat-scroll>
      <div v-for="(message, index) in messages" :key="index">
        <message :message="message"></message>
      </div>
    </div>
    <send-form/>
  </div>
</template>


<script>
import OnlineUsers from "./Chat/OnlineUsers";
import Message from "./Chat/Message";
import SendForm from "./Chat/SendForm";

import "./Chat.css";

export default {
  components: {
    OnlineUsers,
    Message,
    SendForm
  },

  computed: {
    messages() {
      return this.$store.getters.messages;
    }
  },
  mounted() {
    this.$socket.emit("joinChat");
  }
};
</script>
