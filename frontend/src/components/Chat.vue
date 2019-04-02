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
    this.$socket.emit("joinChat", this.$route.params.id);
  }
};
</script>

<style>
.chat {
  height: 100%;
  width: 350px;
  position: relative;
}

.messages {
  height: calc(100% - 212px);
  background: #232935;
  overflow-y: auto;
  border-left: 1px solid #1a1f27;
}

@media (max-width: 800px) {
  .chat {
    width: 100%;
    height: 65%;
  }
}
</style>

