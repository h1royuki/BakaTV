<template>
  <div class="chat-window">
    <div class="messages" v-chat-scroll>
      <div v-for="(message, index) in messages" :key="index">
        <message :message="message"></message>
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
        <send-button
          class="chat-button"
          :title="`Send message`"
          v-on:send="sendMessage"
          :text="`Send`"
        ></send-button>
        <control-button
         v-popover:control.top
          v-if="isOwner"
          class="control-button"
          :title="`Stream settings`"
          v-on:send="showControls"
        >
          <control-icon/>
        </control-button>
        <transition name="fade">
         <popover name="control" class="modal">
            <pause-button
              v-on:send="streamControl('pause')"
              v-if="status == 'work'"
              class="control-button"
              :title="`Pause`"
            >
              <pause-icon  title="" />
            </pause-button>
            <resume-button
              v-on:send="streamControl('resume')"
              v-if="status == 'pause'"
              class="control-button"
              :title="`Resume`"
            >
              <resume-icon title="" />
            </resume-button>
            <destroy-button
              v-on:send="destroyRoom"
              class="control-button"
              :title="`Destroy room`"
            >
              <destroy-icon  title="" />
            </destroy-button>
         </popover>
        </transition>
      </div>
    </div>
  </div>
</template>


<script>
import ClickOutside from "vue-click-outside";
import Message from "./Chat/Message";
import Button from "./Base/Button";
import Textarea from "./Base/Textarea";
import ControlIcon from "vue-material-design-icons/Tune";
import PauseIcon from "vue-material-design-icons/Pause";
import ResumeIcon from "vue-material-design-icons/Play";
import DestroyIcon from "vue-material-design-icons/Delete";

export default {
  components: {
    MessageInput: Textarea,
    SendButton: Button,
    ControlButton: Button,
    PauseButton: Button,
    ResumeButton: Button,
    DestroyButton: Button,
    ControlIcon,
    PauseIcon,
    ResumeIcon,
    DestroyIcon,
    Message
  },

  data() {
    return {
      room: this.$route.params.id,
      message: "",
      isShow: false
    };
  },

  computed: {
    status() {
      return this.$store.getters.status;
    },
    isOwner() {
      return this.$store.getters.isOwner;
    },
    messages() {
      return this.$store.getters.messages;
    }
  },

  mounted() {
    this.popupItem = this.$el;
    this.$socket.emit("chatJoin", this.room);
  },

  methods: {

    destroyRoom() {
      this.$socket.emit("roomDestroy");
    },

    streamControl(status) {
      this.$socket.emit("streamControl", status);
    },

    sendMessage() {
      this.$socket.emit("chatMessage", this.message);
      this.message = "";
    },

    showControls() {
      this.isShow = !this.isShow;
    }
  },
  directives: {
    ClickOutside
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

.control-button {
  padding: 4px 6px 0px 7px;
  background-color: #232935;
  border: none;
  color: #8c98ab;
}

.control-button:hover {
  background-color: #8c98ab;
  color: #232935;
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

div[data-popover="control"] {
      width: 56px !important;
      background-color: #1c2027;
}

div[data-popover="control"]::before {
      border-top-color: #1c2027 !important;
}


@media (max-width: 750px) {
  .chat-button {
    margin-left: 0;
  }
}
</style>

