<template>
  <div class="room" v-if="player.sources[0]">
    <div class="container room">
      <video-player :options="player" class="player"></video-player>
      <chat class="chat" v-bind:isOwner="room.isOwner" v-on:stop="stopStream"></chat>
    </div>
  </div>
</template>
<script>
import Chat from "../components/Room/Chat";

export default {
  components: {
    Chat
  },
  data() {
    return {
      room: {
        id: this.$route.params.id,
        props: null,
        status: null,
        isOwner: false
      },
      player: {
        overNative: true,
        autoplay: true,
        controls: true,
        sources: []
      }
    };
  },
  sockets: {
    getRoomInfo(room) {
      this.player.sources.push({
        withCredentials: false,
        type: "application/x-mpegURL",
        src: process.env.VUE_APP_STREAM_URL + room.streamId + ".m3u8"
      });
      this.room.props = room.props;
      document.title = room.props.name;
      this.room.status = room.status;
      this.room.isOwner = room.owner;
    },

    setOwner() {
      this.room.isOwner = true;
    },

    streamStop() {
      this.$router.push("/");
    }
  },
  methods: {
    stopStream() {
      this.$socket.emit("streamStop", this.room.id);
    }
  },

  mounted() {
    this.$socket.emit("getRoomInfo", this.room.id);
  }
};
</script>

<style>
.container.room {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: stretch;
  max-width: 100%;
  min-height: 100%;
  width: 100%;
  height: 100%;
  position: absolute;
}

.video-player {
  width: 100%;
  min-width: 400px;
  max-width: calc(100% - 350px);
}

.video-js {
  width: 100%;
  height: 100%;
}

.chat {
  width: 100%;
  height: 100%;
  min-width: 350px;
  max-width: 350px;
}

@media (max-width: 800px) {
  .video-player {
    min-width: 100%;
    min-height: 35%;
  }
  .chat {
    min-width: 100%;
    max-height: 65%;
  }
}
</style>


