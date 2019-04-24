<template>
  <div class="item-container">
    <div class="item">
    <film :cover="film.cover" :name="film.name"></film>
      <arrow-down-icon class="icon" @click="showFilmItems(film.url)" :size="30"/>
      </div>
    <div class="files" v-if="isShowFilmItems && searchItemsJson[index]">
      <div v-if="film.type == 'serial'">
        <div v-if="searchItemsJson[index].file[0].folder">
          <div class="season" :class="{line: isShowFilmItems}" v-for="(season, sindx) in searchItemsJson[index].file" :key="sindx">
            <input
              type="checkbox"
              @click="selectSeason(season, sindx)"
              :checked="selectedSeasons[`${searchItemsJson[index].cuid}${sindx}`]"
            >
            <div class="name">{{season.comment}}</div>
            <arrow-down-icon
              class="icon"
              @click="showSeason(sindx)"
              v-if="film.type == 'serial'"
              :size="30"
            />
            <div v-if="isShowSeasons[sindx]">
              <div v-for="(series, serindx)  in season.folder" :key="serindx">
                <div
                :class="{line: isShowSeasons[sindx]}"
                  class="series"
                  @click="itemToogler(series, `${sindx}${serindx}`, season.comment)"
                >
                  <input
                    type="checkbox"
                    :checked="selectedItems[`${searchItemsJson[index].cuid}${sindx}${serindx}`]"
                  >
                  <div class="name" v-html="series.comment"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div v-for="(series, itemsIndex) in searchItemsJson[index].file" :key="itemsIndex">
            <div class="series" @click="itemToogler(series, itemsIndex)">
              <input type="checkbox" :checked="selectedItems[`${searchItemsJson[index].cuid}${itemsIndex}`]">
              <div class="name" v-html="series.title"></div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-if="isShowFilmItems">
          <div>
            <div class="series" :class="{line: isShowFilmItems}" @click="itemToogler(searchItemsJson[index])">
              <input
                type="checkbox"
                :checked="selectedItems[`${searchItemsJson[index].cuid}0`]"
              >
              <div class="name" v-html="film.name"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArrowDownIcon from "vue-material-design-icons/ChevronDown";
import Film from "../Film"

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
      const id = `${this.searchItemsJson[this.index].cuid}${index}`; //filmId - seasonId

      if (this.selectedSeasons[id]) {
        this.$store.commit("unselect", id);

        for (let i = 0; i < season.folder.length; i++) {
          this.unselectItem(`${id}${i}`);
        }
      } else {
        this.$store.commit("select", id);

        for (let i = 0; i < season.folder.length; i++) {
          this.selectItem(season.folder[i], `${id}${i}`, season.comment);
        }
      }
    },

    itemToogler(data, index = 0, season = null) {
      const id = `${this.searchItemsJson[this.index].cuid}${index}`; // filmId - seasonId - seriesId

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
      film.files = data.file;

      if (data.comment) {
        film.desc = data.comment;
      } else if (data.title) {
        film.desc = data.title;
      }

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
  width: 300px;
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
}

.files .series {
  padding: 10px;
  margin-left: 20px;
}

.line {
    border-bottom: 1px solid  #455168;
}
</style>

