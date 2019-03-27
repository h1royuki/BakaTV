<template>
  <div class="room">
    <div class="container room">
      <div class="stream">
        <video-player
          class="player"
          ref="videoPlayer"
          :options="playerOptions"
          :controls="$store.getters.isOwner"
          @play="onPlayerPlay($event)"
          @pause="onPlayerPause($event)"
          @timeupdate="onPlayerTimeupdate($event)"
        ></video-player>
      </div>
      <chat class="chat"></chat>
    </div>
  </div>
</template>
<script>
import Chat from "../components/Chat";

export default {
  components: {
    Chat
  },
  data() {
    return {
      stream: {
        status: null
      },
      playerOptions: {
        overNative: true,
        autoplay: true,
        sources: []
      }
    };
  },

  methods: {
    onPlayerPlay() {
      this.stream.status = "play";
    },
    onPlayerPause() {
      this.stream.status = "pause";
    },
    onPlayerTimeupdate($event) {
      this.stream.time = $event.currentTime();
    }
  },

  sockets: {

    joinRoom(room) {
      this.playerOptions.sources.push({
        withCredentials: false,
        type: "video/mp4",
        src: room.url
      });
    },

    getStreamState() {
      this.$socket.emit("getStreamState", this.stream);
    },

    updateStreamState(stream) {
      if(this.stream.time - stream.time >= 5 || this.stream.time - stream.time <= -5) {
          this.player.currentTime(stream.time);
      }

      if (this.stream.status != stream.status) {

        this.stream.status = stream.status;

        if (stream.status == "play") {
          this.player.play();
        }
        if (stream.status == "pause") {
          this.player.pause();
        }
      }
    }
  },

  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
    isOwner() {
      return this.$store.getters.isOwner;
    }
  },

  mounted() {
    this.$socket.emit("joinRoom", this.$route.params.id);

    setTimeout(() => {
    }, 1000);
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

.stream {
  background-color: black;
  width: 100%;
  max-width: calc(100% - 350px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.player {
  width: 100%;
  height: 100%;
}

.video-js {
  width: 100%;
  height: 100%;
}

.status {
  color: white;
  font-weight: 700;
  font-size: 40px;
  text-align: center;
}

.chat {
  width: 350px;
}

@media (max-width: 800px) {
  .stream {
    min-width: 100%;
    height: 35%;
  }
  .chat {
    width: 100%;
    height: 65%;
  }
}
</style>


