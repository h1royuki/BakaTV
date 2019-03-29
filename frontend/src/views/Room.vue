<template>
  <div class="room">
    <div class="container room">
      <div class="player">
        <video-player
          class="vjs-player"
          ref="videoPlayer"
          :options="playerOptions"
          @play="onPlayerPlay($event)"
          @pause="onPlayerPause($event)"
          @timeupdate="onPlayerTimeupdate($event)"
          @ready="onPlayerReady($event)"
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
      playerState: {
        lastTime: null,
        lastStatus: null
      },
      playerOptions: {
        overNative: true,
        autoplay: true,
        sources: []
      }
    };
  },
  sockets: {
    joinRoom(room) {
      document.title = room.filmName;

      this.playerOptions.sources.push({
        withCredentials: false,
        type: "video/mp4",
        src: room.url
      });

      this.playerState.lastTime = room.time;
      this.playerState.lastStatus = room.status;
    },

    getPlayerTime(time) {
      if (this.isNeedSetTime(this.player.currentTime(), time)) {
        this.playerState.lastTime = time;
        this.player.currentTime(time);
      }
    },

    getPlayerStatus(status) {
      this.setPlayerStatus(status);
    },

    setOwner() {
      this.player.controls(true);
    }
  },

  methods: {
    onPlayerPlay() {
      if (this.isOwner) {
        this.$socket.emit("updatePlayerStatus", "play");
      }
    },

    onPlayerPause() {
      if (this.isOwner) {
        this.$socket.emit("updatePlayerStatus", "pause");
      }
    },

    onPlayerTimeupdate($event) {
      if (this.isOwner) {
        if (
          this.isNeedSetTime($event.currentTime(), this.playerState.lastTime)
        ) {
          this.playerState.lastTime = $event.currentTime();
          this.$socket.emit("updatePlayerTime", $event.currentTime());
        }
      }
    },

    onPlayerReady($event) {
      $event.currentTime(this.playerState.lastTime);
      this.setPlayerStatus(this.playerState.lastStatus);

      if (this.isOwner) {
        $event.controls(true);
      } else {
        $event.controls(false);
      }
    },

    setPlayerStatus(status) {
      this.playerState.lastStatus = status;

      if (status == "play") {
        this.player.play();
      }
      if (status == "pause") {
        this.player.pause();
      }
    },

    isNeedSetTime(time1, time2) {
      let diff = time1 - time2;
      return diff >= 5 || diff <= -5 ? true : false;
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

.vjs-player {
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
  .player {
    min-width: 100%;
    height: 35%;
  }
  .chat {
    width: 100%;
    height: 65%;
  }
}
</style>


