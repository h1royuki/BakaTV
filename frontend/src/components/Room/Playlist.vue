<template>
  <div class="playlist">
    <div class="playlist-films">
      <close-playlist-button class="close-button" v-on:send="hidePopup">x</close-playlist-button>
      <p class="playlist-title">Playlist</p>
      <table class="playlist-table" cellspacing="0">
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>SOURCE</th>
          <th>CURRENT TIME</th>
          <th>STATUS</th>
          <th>ACTIONS</th>
        </tr>
        <tr v-for="(film, index) in playlist.films" :key="index">
          <td class="playlist-table-index">{{index}}</td>
          <td class="playlist-table-name">{{film.name}}</td>
          <td class="playlist-table-url">
            <a class="playlist-table-link" :href="film.url">{{film.url | getDomain}}</a>
          </td>
          <td>{{ film.time | digitToTime}}</td>
          <td>{{film.status}}</td>
          <td class="playlist-table-actions">
            <p v-if="index == playlist.current">Current</p>
            <div v-else>
              <play-button class="set-button" v-on:send="setCurrentFilm(index)">Current</play-button>
              <delete-button class="delete-button" v-on:send="removeFromPlaylist(index)">Delete</delete-button>
            </div>
          </td>
        </tr>
      </table>
      <search-button
        class="add-button"
        v-if="!isSearchPopupShow"
        v-on:send="showSearchPopup"
      >Add to playlist</search-button>
      <div class="add-film-container" v-if="isSearchPopupShow">
        <close-search-button class="close-button" v-on:send="hideSearchPopup">x</close-search-button>
        <search v-on:select="addToPlaylist($event)"/>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../Base/Button.vue";
import Search from "../Search.vue";

export default {
  components: {
    Search,
    PlayButton: Button,
    DeleteButton: Button,
    SearchButton: Button,
    CloseSearchButton: Button,
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
      this.$socket.emit("setCurrentFilm", id);
    },

    hidePopup() {
      this.$store.commit("hidePlaylist");
    }
  },
  
  computed: {
    playlist() {
      return this.$store.getters.playlist;
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
.playlist {
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

.playlist-films {
  background-color: #232935;
  padding: 15px;
  border-radius: 10px;
  width: 90%;
  max-width: 800px;
  max-height: 900px;
  position: relative;
  overflow: auto;
}

.playlist-title {
  font-size: 45px;
  font-weight: 500;
  margin: 15px;
  color: white;
}

.playlist-table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 0 1px #3f4a60;
}

table tr:last-child td:first-child {
  border-bottom-left-radius: 10px;
}

table tr:last-child td:last-child {
  border-bottom-right-radius: 10px;
}

table tr:first-child th:first-child {
  border-top-left-radius: 10px;
}

table tr:first-child th:last-child {
  border-top-right-radius: 10px;
}

th,
td {
  padding: 10px;
  box-shadow: 0 0 0 0.5px #3f4a60;
  text-align: center;
}

.playlist-table-url {
  max-width: 400px;
  word-break: break-all;
}

.playlist-table-actions {
  min-width: 50px;
  max-width: 150px;
}

.playlist-table-link {
  color: #68d4ff;
  text-decoration: none;
}

.set-button {
  max-width: 90px;
  height: 30px;
  background-color: #4b9963;
  border-color: transparent;
}

.set-button:hover {
  background-color: #316340;
}

.delete-button {
  max-width: 90px;
  height: 30px;
  background-color: #994b4b;
  border-color: transparent;
}

.delete-button:hover {
  background-color: #863333;
}

.add-button {
  margin: 0;
  margin-top: 20px;
  width: 100%;
  font-size: 20px;
  padding: 5px;
}

.add-film-container {
  margin-top: 20px;
  overflow: auto;
  max-height: 500px;
  background-color: #191e27;
  margin-left: -15px;
  margin-right: -15px;
  margin-bottom: -15px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  position: relative;
}

.close-button {
  position: absolute;
  right: 5px;
  top: 0px;
  background-color: transparent;
  border: none;
  font-size: 20px;
}

.close-button:hover {
  background-color: transparent;
}
</style>


