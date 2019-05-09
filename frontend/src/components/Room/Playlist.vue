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
        <!--   <div class="playlist-title">
          Playlist
          <playlist-star-icon class="icon" :size="35"/>
        </div>
        -->
        <div
          v-if="playlist.current"
          class="active-item"
          :style="{backgroundImage: `url(${playlist.current.cover})`}"
        >
        <div class="active-item-bg"></div>
          <film
            class="item-props"
            :name="playlist.current.name"
            :season="playlist.current.season"
            :desc="playlist.current.desc"
            :height="120"
            :width="75"
            :fontSize="20"
          ></film>
          <div class="active-item-actions">
              <delete-active-icon
                @click="removeFromPlaylist(playlist.current.id)"
                :size="35"
                title="Delete film"
                class="icon"
              />
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
        <div class="playlist-control-buttons">
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
import PlayCircleIcon from "vue-material-design-icons/PlayCircle";
import PauseCircleIcon from "vue-material-design-icons/PauseCircle";
import WaitCircleIcon from "vue-material-design-icons/CircleSlice3";
import EndedCircleIcon from "vue-material-design-icons/CheckboxMarkedCircle";
import DeleteActiveIcon from "vue-material-design-icons/Delete";
import DeleteIcon from "vue-material-design-icons/DeleteCircle";
import LinkIcon from "vue-material-design-icons/LinkVariant";
import ClockIcon from "vue-material-design-icons/ClockOutline";
import EmptyIcon from "vue-material-design-icons/FormatListCheckbox";
import Film from "../Film";

import "./Playlist.css";

export default {
  components: {
    Search,
    EmptyIcon,
    PlayCircleIcon,
    PauseCircleIcon,
    WaitCircleIcon,
    EndedCircleIcon,
    DeleteIcon,
    LinkIcon,
    ClockIcon,
    DeleteActiveIcon,
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

