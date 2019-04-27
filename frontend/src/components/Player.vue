<template>
  <div class="video-container">
    <transition name="change-video">
      <div class="change-video" :key="film.desc">
        <p>{{film.name}}</p>
        <p>{{film.season}}</p>
        <p v-html="film.desc"></p>
      </div>
    </transition>
    <div v-if="!isOwner && lastStatus == 'pause'" class="video-overlay">
      <pause-icon :size="100"/>
    </div>
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
  </div>
</template>


<script>
import PauseIcon from "vue-material-design-icons/PauseCircleOutline";

export default {
  components: {
    PauseIcon
  },

  data() {
    return {
      playerOptions: {
        overNative: true,
        autoplay: true,
        sources: []
      },

      film: false
    };
  },
  sockets: {
    updateFilm(film) {
      this.film = film;

      this.playerOptions.sources = [];

      this.playerOptions.sources.push({
        withCredentials: false,
        type: "video/mp4",
        src: film.url
      });
      document.title = film.name;
    },

    updateFilmTime(time) {
      if (this.isNeedSetTime(this.player.currentTime(), time)) {
        this.$store.dispatch("setFilmTime", time);
        this.player.currentTime(time);
      }
    },

    updateFilmStatus(status) {
      this.setPlayerStatus(status);
    },

    updateRoomOwner() {
      this.player.controls(true);
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
          this.$store.dispatch("setFilmTime", $event.currentTime());
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
        this.$socket.emit("getNextFilm");
      }
    },

    setPlayerStatus(status) {
      this.$store.dispatch("setFilmStatus", status);

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
    this.$socket.emit("getFilm");
  }
};
</script>

<style>
.video-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.vjs-player {
  width: 100%;
  height: 100%;
}

.video-js {
  width: 100%;
  height: 100%;
}

.change-video {
  position: absolute;
  flex-direction: column;
  top: 10px;
  z-index: 10;
  display: flex;
  height: 100px;
  width: 100%;
  align-items: center;
  justify-content: center;
  opacity: 0;
  background-color: #0009;
}

.change-video p {
  font-size: 20px;
  margin: 0;
  text-align: center;
}

.video-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  background-color: #0009;
}

.change-video-enter-active {
  opacity: 1;
}

.change-video-enter-to {
  transition: 7s;
  opacity: 0;
}
</style>

