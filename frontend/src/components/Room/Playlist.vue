<template>
  <div class="playlist-container">
    <div class="add-film" v-if="isSearchPopupShow">
      <close-circle-icon @click="hideSearchPopup" :size="30" class="close"/>
      <search :scroll="true" v-on:select="addToPlaylist($event)"/>
    </div>
    <div v-else class="playlist">
      <div class="playlist-title">
        Playlist
        <playlist-star-icon class="icon" :size="36"/>
      </div>
      <div class="playlist-items">
        <div
          class="playlist-item"
          v-for="(film, index) in playlist.films"
          v-bind:class="{line: isLineNeed(index), active: index == playlist.current}"
          :key="index"
        >
          <div class="item-cover" @click="setCurrentFilm(index)">
            <img class="cover" :src="film.cover">
            <div class="play" v-if="index != playlist.current">
              <play-icon title="Play film" :size="42"/>
            </div>
          </div>
          <div class="item-text-container">
            <div class="item-name">{{film.name}}</div>
          </div>
          <div class="item-actions-container">
          <div class="item-actions">
            <play-circle-icon :size="22" title="Playing" class="play" v-if="film.status == `play`"/>
            <pause-circle-icon
              :size="22"
              title="Paused"
              class="play"
              v-if="film.status == `pause`"
            />
            <wait-circle-icon
              :size="22"
              title="Waiting to play"
              class="play"
              v-if="film.status == `wait`"
            />
          </div>
          <div class="item-time">
            <clock-icon
              v-popover.top="{name: `time` + index}"
              class="icon"
              :size="22"
              title="Film time"
            />
            <transition name="fade">
              <popover class="popover time" :name="`time` + index">
                <div class="time">{{ film.time | digitToTime}}</div>
              </popover>
            </transition>
          </div>
          <div class="item-url">
            <link-icon v-popover.top="{name: `link` + index}" :title="film.url | getDomain"/>
            <transition name="fade">
              <popover class="popover url" :name="`link` + index">
                <a class="link" :href="film.url">{{film.url | getDomain}}</a>
              </popover>
            </transition>
          </div>
          <div class="item-delete">
            <delete-icon
              @click="removeFromPlaylist(index)"
              :size="24"
              title="Delete film"
              class="icon"
            />
          </div>
          </div>
          <div class="line" v-if="index != playlist.current"></div>
        </div>
      </div>
      <div class="control-buttons">
        <search-button class="add" v-if="!isSearchPopupShow" v-on:send="showSearchPopup">Add film</search-button>
        <close-playlist-button class="close" v-on:send="hidePopup">Close</close-playlist-button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../Base/Button.vue";
import Search from "../Search.vue";
import PlaylistStarIcon from "vue-material-design-icons/PlaylistStar";
import PlayIcon from "vue-material-design-icons/Play";
import PlayCircleIcon from "vue-material-design-icons/PlayCircle";
import PauseCircleIcon from "vue-material-design-icons/PauseCircle";
import WaitCircleIcon from "vue-material-design-icons/CircleSlice3";
import CloseCircleIcon from "vue-material-design-icons/CloseCircle";
import DeleteIcon from "vue-material-design-icons/DeleteCircle";
import LinkIcon from "vue-material-design-icons/LinkVariant";
import ClockIcon from "vue-material-design-icons/ClockOutline";

export default {
  components: {
    Search,
    PlaylistStarIcon,
    PlayIcon,
    PlayCircleIcon,
    PauseCircleIcon,
    WaitCircleIcon,
    CloseCircleIcon,
    DeleteIcon,
    LinkIcon,
    ClockIcon,
    SearchButton: Button,
    ClosePlaylistButton: Button
  },

  data() {
    return {
      isSearchPopupShow: false
    };
  },

  methods: {
    showSearchPopup() {
      this.isSearchPopupShow = true;
    },

    hideSearchPopup() {
      this.isSearchPopupShow = false;
    },

    addToPlaylist(film) {
      this.$store.commit("changeLoading");
      this.$socket.emit("addToPlaylist", film);
    },

    removeFromPlaylist(id) {
      this.$socket.emit("removeFromPlaylist", id);
    },

    setCurrentFilm(id) {
      if (this.playlist.current != id) {
        this.$socket.emit("setFilm", id);
      }
    },

    hidePopup() {
      this.$store.commit("hidePlaylist");
    },

    isLineNeed(id) {
      if (
        id == this.playlistLength - 1 ||
        id == this.playlist.current ||
        id == this.playlist.current - 1
      ) {
        return false;
      }
      return true;
    }
  },

  computed: {
    playlist() {
      return this.$store.getters.playlist;
    },

    playlistLength() {
      return this.$store.getters.playlistLength;
    }
  },

  mounted() {
    this.$socket.emit("getPlaylist");
  },

  filters: {
    getDomain: value => {
      // eslint-disable-next-line
      return value.match(/https?\:\/\/(((\w*\.)?)*\w*\.\w*)/)[1];
    },

    digitToTime: digit => {
      let time = [];

      if (digit >= 3600) {
        let hours = Math.floor(digit / 3600);
        digit = digit - hours * 3600;
        time.push(hours + "h");
      }

      if (digit >= 60) {
        let minutes = Math.floor(digit / 60);
        digit = digit - minutes * 60;
        time.push(minutes + "m");
      }

      if (digit >= 0) {
        digit = Math.floor(digit);
        time.push(digit + "s");
      }

      return time.join(" ");
    }
  }
};
</script>

<style>
.playlist-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #000c;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.add-film {
  background-color: #232935;
  border: 1px solid #2f3747;
  border-radius: 8px;
  position: relative;
  max-width: 700px;
  padding: 50px 0;
  width: 90%;
}

.add-film .close {
  position: absolute;
  right: 10px;
  top: 10px;
  color: #ff3e3e;
  cursor: pointer;
}

.playlist {
  background-color: #232935;
  border: 1px solid #2f3747;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.playlist-title {
  display: flex;
  font-size: 25px;
  font-weight: 500;
  padding: 10px;
  margin: 0;
}

.playlist-title .icon {
  padding: 0 10px;
}

.playlist-items {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}

.playlist-item {
  display: flex;
  flex-direction: row;
  padding: 10px 0px;
  align-items: center;
}

.playlist-items .active {
  border-radius: 5px;
  background-color: #323a4a;
  padding: 5px;
  border-bottom: none !important;
}

.playlist-item .item-cover {
  margin: 0 10px;
  top: 3px;
  position: relative;
  cursor: pointer;
}

.item-cover .cover {
  width: 60px;
  border-radius: 5px;
}

.item-cover .play {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 6px;
  color: white;
  width: 100%;
  border-radius: 5px;
  opacity: 0;
  transition: 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-cover .play:hover {
  opacity: 1;
  transition: 0.3s;
  background-color: #0009;
}

.playlist-item .item-text-container {
  display: flex;
  width: 100%;
}

.playlist-item .item-name {
  padding: 0 10px;
  width: 200px;
}


.playlist-item .item-actions-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.item-actions-container .item-actions {
  padding: 0 10px;
  position: relative;
}

.item-actions-container .item-url {
  padding: 0 10px;
  position: relative;
  cursor: pointer;
}

.item-actions-container .item-time {
  padding: 0 10px;
  position: relative;
  cursor: pointer;
}

.item-actions-container .item-delete {
  padding: 0 10px;
}

.item-delete .icon {
  color: #ff3e3e;
}

.line {
  border-bottom: 1px solid #364053;
}

.item-delete .icon {
  cursor: pointer;
}

.control-buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: -10px;
}

.control-buttons .add {
  font-size: 15px;
  padding: 5px 10px;
}

.control-buttons .close {
  font-size: 15px;
  padding: 5px 10px;
  background-color: #ff3e3e;
  border: transparent;
}

.popover {
  background-color: #39404d;
  box-shadow: 0 0 5px 0 #0000001a;
}

.popover.url {
  width: 106px !important;
  left: -38px !important;
  top: -45px !important;
}

.popover.time {
  width: 90px !important;
  left: -25px !important;
  top: -40px !important;
}

.popover::before {
  border-top-color: #39404d !important;
}

.popover.time .time {
  color: #448cf8;
  font-size: 15px;
  text-decoration: none;
  margin: 0;
  text-align: center;
}

.popover.url .link {
  color: #448cf8;
  font-size: 15px;
  text-decoration: none;
  margin: 0;
}
</style>


