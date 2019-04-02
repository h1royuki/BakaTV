<template>
  <video-player
    class="vjs-player"
    ref="videoPlayer"
    :options="playerOptions"
    @play="onPlayerPlay($event)"
    @pause="onPlayerPause($event)"
    @timeupdate="onPlayerTimeupdate($event)"
    @ready="onPlayerReady($event)"
  ></video-player>
</template>


<script>
export default {
  data() {
    return {
      playerOptions: {
        overNative: true,
        autoplay: true,
        sources: []
      }
    };
  },
  sockets: {
    getPlayerState(player) {
      this.playerOptions.sources.push({
        withCredentials: false,
        type: "video/mp4",
        src: player.url
      });

      document.title = player.name;
    },

    getPlayerTime(time) {
      if (this.isNeedSetTime(this.player.currentTime(), time)) {
        this.$store.dispatch("setLastTime", time);
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
        if (this.isNeedSetTime($event.currentTime(), this.lastTime)) {
          this.$store.dispatch("setLastTime", $event.currentTime());
          this.$socket.emit("updatePlayerTime", $event.currentTime());
        }
      }
    },

    onPlayerReady($event) {
      $event.currentTime(this.lastTime);
      this.setPlayerStatus(this.lastStatus);

      if (this.isOwner) {
        $event.controls(true);
      } else {
        $event.controls(false);
      }
    },

    setPlayerStatus(status) {
      this.$store.dispatch("setLastStatus", status);

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
    },

    lastTime() {
      return this.$store.getters.lastTime;
    },

    lastStatus() {
      return this.$store.getters.lastStatus;
    }
  },

  mounted() {
    this.$socket.emit("getPlayerState");
  }
};
</script>

<style>
.vjs-player {
  width: 100%;
  height: 100%;
}

.video-js {
  width: 100%;
  height: 100%;
}
</style>

