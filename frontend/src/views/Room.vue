<template>
  <div v-if="isJoined" class="room">
    <div class="container room">
      <playlist v-if="isShowPlaylist"/>
      <div class="player">
        <player/>
      </div>
      <chat class="chat"/>
    </div>
  </div>
</template>
<script>
import Playlist from "../components/Room/Playlist";
import Player from "../components/Player";
import Chat from "../components/Chat";

import "./Room.css";

export default {
  components: {
    Player,
    Chat,
    Playlist
  },

  sockets: {
    reconnect() {
      this.$socket.emit("reconnectToRoom", this.$route.params.id);
    }
  },

  computed: {
    isShowPlaylist() {
      return this.$store.getters.isShowPlaylist;
    },
    isJoined() {
      return this.$store.getters.isJoined;
    },
  },
  mounted() {
    this.$socket.emit("joinRoom", this.$route.params.id);
  },

  beforeDestroy() {
    this.$store.dispatch('socket_destroyRoom');
    this.$socket.emit("leaveFromRoom");
  }
};
</script>

