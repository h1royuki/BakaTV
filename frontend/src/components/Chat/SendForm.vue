<template>
  <div class="send-form">
    <message-input
      class="message-input"
      v-model="message"
      :rows="3"
      :placeholder="`Enter message`"
      :max-chars="200"
      v-on:enter="sendMessage"
    ></message-input>
    <emoji-popup v-on:hide="hideEmoji" v-on:select="selectEmoji($event)" v-if="isShowEmoji"></emoji-popup>
    <emoji-button @click="showEmoji" class="emoji-button" :title="`Emoji`">
      <emoji-icon/>
    </emoji-button>

    <div class="control-buttons">
      <send-button class="chat-button" :title="`Send message`" @click="sendMessage">Send message</send-button>
      <playlist-button
        v-if="isOwner || isRoomCreator"
        @click="showPlaylist"
        class="control-button"
        :title="`Playlist`"
      >
        <playlist-icon title/>
      </playlist-button>
      <destroy-button
        v-if="isRoomCreator"
        @click="destroyRoom"
        class="control-button"
        :title="`Destroy room`"
      >
        <destroy-icon title/>
      </destroy-button>
    </div>
  </div>
</template>

<script>
import Button from "../Base/Button";
import Textarea from "../Base/Textarea";
import PlaylistIcon from "vue-material-design-icons/PlaylistPlay";
import DestroyIcon from "vue-material-design-icons/Delete";
import EmojiIcon from "vue-material-design-icons/EmoticonExcitedOutline";
import EmojiPopup from "./SendForm/EmojiPopup";

import "./SendForm.css";

export default {
  components: {
    MessageInput: Textarea,
    SendButton: Button,
    DestroyButton: Button,
    PlaylistButton: Button,
    EmojiButton: Button,
    EmojiIcon,
    PlaylistIcon,
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
    },

    isRoomCreator() {
      return this.$store.getters.isCreator;
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
    },

    showPlaylist() {
      this.$store.commit("showPlaylist");
    }
  }
};
</script>

