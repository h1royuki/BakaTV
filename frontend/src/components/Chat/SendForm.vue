<template>
  <div class="send-form">
    <message-input
      class="message-input"
      v-model="message"
      :rows="3"
      :placeholder="`Enter message`"
      v-on:enter="sendMessage()"
    ></message-input>
    <emoji-popup v-on:hide="hideEmoji" v-on:select="selectEmoji($event)" v-if="isShowEmoji"></emoji-popup>
    <emoji-button v-on:send="showEmoji" class="emoji-button" :title="`Emoji`">
      <emoji-icon/>
    </emoji-button>

    <div class="control-buttons">
      <send-button
        class="chat-button"
        :title="`Send message`"
        v-on:send="sendMessage"
        :text="`Send`"
      ></send-button>

      <control-button
        v-popover:control.top
        v-show="isOwner"
        class="control-button"
        :title="`Room settings`"
      >
        <control-icon/>
      </control-button>

      <transition name="fade">
        <popover name="control" class="modal">
          <destroy-button v-on:send="destroyRoom" class="control-button" :title="`Destroy room`">
            <destroy-icon title/>
          </destroy-button>
        </popover>
      </transition>
    </div>
  </div>
</template>

<script>
import Button from "../Base/Button";
import Textarea from "../Base/Textarea";
import ControlIcon from "vue-material-design-icons/Tune";
import DestroyIcon from "vue-material-design-icons/Delete";
import EmojiIcon from "vue-material-design-icons/EmoticonExcitedOutline";
import EmojiPopup from "./SendForm/EmojiPopup";

export default {
  components: {
    MessageInput: Textarea,
    SendButton: Button,
    ControlButton: Button,
    DestroyButton: Button,
    EmojiButton: Button,
    ControlIcon,
    EmojiIcon,
    DestroyIcon,
    EmojiPopup
  },

  data() {
    return {
      message: "",
      isShowEmoji: false
    };
  },

  computed: {
    isOwner() {
      return this.$store.getters.isOwner;
    }
  },

  methods: {
    sendMessage() {
      this.$socket.emit("messageChat", this.message);
      this.message = "";
    },

    destroyRoom() {
      this.$socket.emit("destroyRoom");
    },

    showEmoji() {
      this.isShowEmoji = true;
    },

    hideEmoji() {
      this.isShowEmoji = false;
    },

    selectEmoji(emoji) {
      this.message += ` ${emoji}`;
    }
  }
};
</script>

<style>
.send-form {
  padding: 10px 10px 0 10px;
  height: 150px;
  display: flex;
  flex-direction: column;
}

.message-input {
  max-height: 60px;
  font-size: 16px;
}

.emoji-button {
  position: absolute;
  right: 11px;
  padding: 0;
  background-color: transparent;
  border: none;
  color: #969595;
}

.emoji-button:hover {
  color: #fff;
  background-color: transparent;
}

.control-buttons {
  display: flex;
}

.control-button {
  padding: 4px 6px 0px 7px;
  background-color: #384359;
  border: none;
  color: #e1e1e1;
}

.control-button:hover {
  background-color: #e1e1e1;
  color: #384359;
}

.chat-button {
  padding: 7px 12px;
  font-size: 15px;
  padding: 7px 12px;
  font-size: 15px;
  width: 100%;
  background-color: #2e5e89;
  border: 1px solid #2e5e89;
}

div[data-popover="control"] {
  width: 56px !important;
  background-color: #1c2027;
}

div[data-popover="control"]::before {
  border-top-color: #1c2027 !important;
}

@media (max-width: 800px) {
  .chat-button {
    margin-left: 0;
  }
}
</style>



