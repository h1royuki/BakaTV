<template>
  <transition name="fade">
    <div class="playlist-container">
      <search
        v-if="isSearchPopupShow"
        v-on:action="addToPlaylist($event)"
        v-on:close="hideSearchPopup"
        v-on:select="addToPlaylist($event)"
        :action-name="`Add to playlist`"
      ></search>

      <div class="playlist">
        <div class="playlist-title">
          Playlist
          <playlist-star-icon class="icon" :size="35"/>
        </div>
        <div v-if="playlist.current" class="active-item">
          <film
            class="item-props"
            :name="playlist.current.name"
            :season="playlist.current.season"
            :desc="playlist.current.desc"
            :cover="playlist.current.cover"
            :height="120"
            :width="75"
            :fontSize="20"
          ></film>
          <div class="active-item-actions">
            <div class="item-delete">
              <delete-icon
                @click="removeFromPlaylist(playlist.current.id)"
                :size="24"
                title="Delete film"
                class="icon"
              />
            </div>
          </div>
        </div>
        <div v-if="!playlist.films[0]" class="playlist-empty">
          <empty-icon :size="70"/>Playlist empty
        </div>
        <div v-else class="playlist-items">
          <div class="playlist-item" v-for="(film, index) in playlist.films" :key="index">
            <film
              class="item-props"
              :name="film.name"
              :season="film.season"
              :desc="film.desc"
              :cover="film.cover"
              @click="setCurrentFilm(film.id)"
            ></film>
            <div class="item-actions-container">
              <div class="item-status">
                <play-circle-icon
                  :size="22"
                  title="Playing"
                  class="play"
                  v-if="film.status == `play`"
                />
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
                <ended-circle-icon
                  :size="22"
                  title="Ended"
                  class="end"
                  v-if="film.status == `end`"
                />
              </div>
              <div class="item-time">
                <clock-icon
                  v-popover.top="{name: `time` + index}"
                  class="icon"
                  :size="23"
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
                  @click="removeFromPlaylist(film.id)"
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
          <search-button class="add" v-if="!isSearchPopupShow" @click="showSearchPopup">Add film</search-button>
          <close-playlist-button class="close" @click="hidePopup">Close</close-playlist-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Button from "../Base/Button.vue";
import Search from "../Search.vue";
import PlaylistStarIcon from "vue-material-design-icons/PlaylistStar";
import PlayCircleIcon from "vue-material-design-icons/PlayCircle";
import PauseCircleIcon from "vue-material-design-icons/PauseCircle";
import WaitCircleIcon from "vue-material-design-icons/CircleSlice3";
import EndedCircleIcon from "vue-material-design-icons/CheckboxMarkedCircle";
import DeleteIcon from "vue-material-design-icons/DeleteCircle";
import LinkIcon from "vue-material-design-icons/LinkVariant";
import ClockIcon from "vue-material-design-icons/ClockOutline";
import EmptyIcon from "vue-material-design-icons/FormatListCheckbox";
import Film from "../Film";

export default {
  components: {
    Search,
    PlaylistStarIcon,
    EmptyIcon,
    PlayCircleIcon,
    PauseCircleIcon,
    WaitCircleIcon,
    EndedCircleIcon,
    DeleteIcon,
    LinkIcon,
    ClockIcon,
    SearchButton: Button,
    ClosePlaylistButton: Button,
    Film
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

    addToPlaylist(items) {
      this.$store.commit("startLoading");
      this.$socket.emit("addToPlaylist", items);
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

.playlist {
  background-color: #232935;
  border: 1px solid #2f3747;
  padding: 20px;
  border-radius: 8px;
  max-width: 510px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.playlist-title {
  display: flex;
  font-size: 25px;
  font-weight: 500;
  margin: 0;
}

.playlist-title .icon {
  padding: 0 10px;
}

.active-item {
  border-radius: 5px;
  background-color: #323a4a;
  padding: 10px 10px;
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.playlist-items {
  font-size: 17px;
  max-height: 300px;
  overflow: auto;
  margin: 0 5px;
}

.playlist-empty {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px 0;
  width: 100%;
  font-size: 18px;
  color: #505d77;
}

.playlist-item {
  display: flex;
  flex-direction: row;
  padding: 10px 0px;
  align-items: center;
}

.playlist-item .item-props {
  display: flex;
  width: 830px;
  cursor: pointer;
}

.playlist-item .item-actions-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.item-actions-container .item-status {
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
  background-color: #39404d !important;
  box-shadow: 0 0 5px 0 #0000001a !important;
}

.popover.url {
  width: 106px !important;
  left: -38px !important;
  top: -40px !important;
}

.popover.time {
  width: 90px !important;
  left: -29px !important;
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


