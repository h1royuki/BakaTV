<template>
  <div v-if="roomId == $route.params.id" class="room">
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

export default {
  components: {
    Player,
    Chat,
    Playlist
  },
  computed: {
    roomId() {
      return this.$store.getters.roomId;
    },
    
    isShowPlaylist() {
      return this.$store.getters.isShowPlaylist;
    }
  },
  mounted() {
    this.$socket.emit("joinRoom", this.$route.params.id);
  }
};
</script>

<style>
.container.room {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
  height: 100%;
  position: absolute;
}

.player {
  background-color: black;
  width: 100%;
  max-width: calc(100% - 350px);
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 800px) {
  .player {
    min-width: 100%;
    height: 35%;
  }
}
</style>


