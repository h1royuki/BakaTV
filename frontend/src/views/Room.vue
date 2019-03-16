<template>
  <div class="room" v-if="player.sources[0]">
    <div class="container room">
      <video-player :options="player" class="player"></video-player>
      <chat class="chat" v-on:stop="stopStream"></chat>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import Chat from "../components/Room/Chat";

export default {
  components: {
    Chat: Chat
  },
  data() {
    return {
      socket: io(process.env.VUE_APP_SOCKET_STREAM_URL),
      room: {
        id: this.$route.params.id,
        props: null,
        status: null
      },
      player: {
        overNative: true,
        autoplay: true,
        controls: true,
        sources: []
      }
    };
  },

  methods: {
    stopStream() {
      this.socket.emit("stop", this.room.id);
    }
  },

  mounted() {
    this.socket.emit("get", this.room.id);

    this.socket.on("get", room => {
      this.player.sources.push({
        withCredentials: false,
        type: "application/x-mpegURL",
        src: process.env.VUE_APP_STREAM_URL + room.stream + '.m3u8'
      })

      this.room.props = room.props;
      document.title = room.props.name_rus;
      this.room.status = room.status;
    });

    this.socket.on("404", () => {
      this.$router.push("/");
    });

    this.socket.on("stop", () => {
      this.$router.push("/");
    });

    this.socket.on("err", text => {
      this.sendError(text);
    });
  }
};
</script>

<style>
.container.room {
  display: flex;
  flex-direction: row;
  justify-content: start;
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

@media (max-width: 750px) {
  .video-player {
    min-width: 100%;
    min-height: 40%;
  }
  .chat {
    min-width: 100%;
    max-height: 60%;
  }
}
</style>


