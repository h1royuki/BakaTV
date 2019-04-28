<template>
  <div class="item-container">
    <div class="item">
      <film :cover="film.cover" :name="film.name"></film>
      <arrow-down-icon class="icon" @click="showFilmItems(film.url)" :size="30"/>
    </div>
    <div class="files" v-if="isShowFilmItems && searchItemsJson[index]">
      <div v-if="searchItemsJson[index].type == 'serial'">
        <div v-if="searchItemsJson[index].seasons">
          <div
            class="season"
            v-for="(season, sindx) in searchItemsJson[index].seasons"
            :key="sindx"
          >
            <div class="season-props" :class="{line: isShowFilmItems}">
              <input
                type="checkbox"
                @click="selectSeason(season, sindx)"
                :checked="selectedSeasons[`${searchItemsJson[index].id}${sindx}`]"
              >
              <div class="name">{{season.title}}</div>
              <arrow-down-icon class="icon" @click="showSeason(sindx)" :size="30"/>
            </div>
            <div class="series" v-if="isShowSeasons[sindx]">
              <div
                class="series-props"
                :class="{line: isShowSeasons[sindx]}"
                v-for="(episode, serindx)   in season.episodes"
                :key="serindx"
              >
                <div @click="itemToogler(episode, `${sindx}${serindx}`, season.title)">
                  <input
                    type="checkbox"
                    :checked="selectedItems[`${searchItemsJson[index].id}${sindx}${serindx}`]"
                  >
                  <div class="name" v-html="episode.title"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div
            class="props"
            v-for="(episode, itemsIndex) in searchItemsJson[index].episodes"
            :key="itemsIndex"
          >
            <div class="series-props" @click="itemToogler(episode, itemsIndex)">
              <input
                type="checkbox"
                :checked="selectedItems[`${searchItemsJson[index].id}${itemsIndex}`]"
              >
              <div class="name" v-html="episode.title"></div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-if="isShowFilmItems">
          <div>
            <div
              class="series-props"
              :class="{line: isShowFilmItems}"
              @click="itemToogler(searchItemsJson[index])"
            >
              <div class="props">
                <input type="checkbox" :checked="selectedItems[`${searchItemsJson[index].id}0`]">
                <div class="name" v-html="film.name"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArrowDownIcon from "vue-material-design-icons/ChevronDown";
import Film from "../Film";

export default {
  props: {
    film: Object,
    index: Number
  },

  components: {
    ArrowDownIcon,
    Film
  },

  data() {
    return {
      isShowFilmItems: false,
      isShowSeasons: {}
    };
  },

  methods: {
    selectSeason(season, index) {
      const id = `${this.searchItemsJson[this.index].id}${index}`; //filmId - seasonId

      if (this.selectedSeasons[id]) {
        this.$store.commit("unselect", id);

        for (let i = 0; i < Object.keys(season.episodes).length; i++) {
          this.unselectItem(`${id}${i}`);
        }
      } else {
        this.$store.commit("select", id);
        for (let i = 0; i < Object.keys(season.episodes).length; i++) {
          this.selectItem(season.episodes[i], `${id}${i}`, season.title);
        }
      }
    },

    itemToogler(data, index = 0, season = null) {
      const id = `${this.searchItemsJson[this.index].id}${index}`; // filmId - seasonId - seriesId

      if (this.selectedItems[id]) {
        this.unselectItem(id);
      } else {
        this.selectItem(data, id, season);
      }
    },

    selectItem(data, id, season = null) {
      // get film props
      let film = this.film;

      // filling
      film.id = id;
      film.season = season;
      film.url = data.url;

      film.desc = data.title;

      this.$store.dispatch("select", film); // this object returns to server
    },

    unselectItem(index) {
      this.$store.dispatch("unselect", index);
    },

    showFilmItems(url) {
      if (this.isShowFilmItems) {
        this.isShowFilmItems = false;
      } else {
        this.isShowFilmItems = true;
      }
      if (!this.searchItemsJson[this.index]) {
        this.$store.commit("startLoading");
        this.$socket.emit("getSeriesJson", { id: this.index, url: url }); // return json object
      }
    },

    showSeason(index) {
      if (this.isShowSeasons[index] == true) {
        this.$set(this.isShowSeasons, index, false);
      } else {
        this.$set(this.isShowSeasons, index, true);
      }
    }
  },

  computed: {
    searchItemsJson() {
      return this.$store.getters.searchItemsJson; // array of objects
    },

    selectedItems() {
      return this.$store.getters.selectedItems;
    },
    selectedSeasons() {
      return this.$store.getters.selectedSeasons;
    }
  }
};
</script>


<style>
.item-container {
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: relative;
  overflow: hidden;
  margin-top: 10px;
}

.props .name {
  font-size: 18px;
  color: white;
  padding: 5px;
  text-align: center;
}

.items-container .files {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

.files .season {
  padding: 10px;
  margin-left: 20px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

.season-props {
  display: flex;
  align-items: center;
}

.series-props {
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.files .series {
  padding: 10px;
  margin-left: 20px;
}

.line {
  border-bottom: 1px solid #455168;
}
</style>

