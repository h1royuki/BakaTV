<template>
  <video-player
    class="vjs-player"
    ref="videoPlayer"
    :options="playerOptions"
    @play="onPlayerPlay($event)"
    @pause="onPlayerPause($event)"
    @timeupdate="onPlayerTimeupdate($event)"
    @ready="onPlayerReady($event)"
    @ended="onPlayerEnded($event)"
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
    setCurrentFilm(film) {
      this.playerOptions.sources = [];

      this.playerOptions.sources.push({
        withCredentials: false,
        type: "video/mp4",
        src: film.url
      });
    },

    getFilmInfo(film) {
      this.playerOptions.sources.push({
        withCredentials: false,
        type: "video/mp4",
        src: film.url
      });

      document.title = film.name;
    },

    getFilmTime(time) {
      if (this.isNeedSetTime(this.player.currentTime(), time)) {
        this.$store.dispatch("setLastTime", time);
        this.player.currentTime(time);
      }
    },

    getFilmStatus(status) {
      this.setPlayerStatus(status);
    },

    updateRoomOwner(owner) {
      if (owner == this.userId) {
        this.player.controls(true);
      }
    }
  },

  methods: {
    onPlayerPlay() {
      if (this.isOwner) {
        this.$socket.emit("updateFilmStatus", "play");
      }
    },

    onPlayerPause() {
      if (this.isOwner) {
        this.$socket.emit("updateFilmStatus", "pause");
      }
    },

    onPlayerTimeupdate($event) {
      if (this.isOwner) {
        if (this.isNeedSetTime($event.currentTime(), this.lastTime)) {
          this.$store.dispatch("setLastTime", $event.currentTime());
          this.$socket.emit("updateFilmTime", $event.currentTime());
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

    onPlayerEnded() {
      if (this.isOwner) {
        this.$socket.emit('getNextFilm');
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
    },
    userId() {
      return this.$store.getters.userId;
    }
  },

  mounted() {
    this.$socket.emit("getFilmInfo");
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

