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

      <transition name="fade">
        <div v-on-clickaway="hideEmoji" v-if="isShowEmoji" class="emoji-picker">
          <VEmojiPicker
            :labelSearch="`Search...`"
            :showCategory="true"
            :pack="pack"
            @select="selectEmoji"
          />
        </div>
      </transition>

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
  </div>
</template>


<script>
import Message from "./Chat/Message";
import Button from "./Base/Button";
import Textarea from "./Base/Textarea";
import ControlIcon from "vue-material-design-icons/Tune";
import DestroyIcon from "vue-material-design-icons/Delete";
import EmojiIcon from "vue-material-design-icons/EmoticonExcitedOutline";
import VEmojiPicker from "v-emoji-picker";
import packData from "v-emoji-picker/data/emojis.json";
import { directive as onClickaway } from "vue-clickaway";

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
    Message,
    VEmojiPicker
  },

  data() {
    return {
      room: this.$route.params.id,
      message: "",
      isShowEmoji: false,
      pack: packData
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
    this.$socket.emit("joinChat", this.room);
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
      this.message +=  ` ${emoji.emoji}`;
    }
  },
  directives: {
    onClickaway: onClickaway
  }
};
</script>

<style>
.messages {
  height: calc(100% - 161px);
  background: #232935;
  overflow-y: scroll;
  border-left: 1px solid #1a1f27;
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

.emoji-picker {
  position: absolute;
  bottom: 150px;
  right: 10px;
}

.grid-emojis {
  color: #b7b7b7 !important;
}

.container-search input {
  background: #1c212a !important;
  border: 1px solid #1c212a !important;
}

#Categories {
  border-bottom-color: #1c212a !important;
  background: #1c212a !important;
  color: #fff !important;
}

#EmojiPicker {
  background: #29303c !important;
  border-color: #1c212a !important;
}

.category.active {
  border-bottom-color: #2e5e89 !important;
}

@media (max-width: 800px) {
  .chat-button {
    margin-left: 0;
  }
}
</style>

