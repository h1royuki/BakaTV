<template>
  <div class="search-container">
    <div class="search">
      <div class="search-wrapper">
        <div class="search-form">
          <url-input
            class="search-input"
            :type="`text`"
            :placeholder="`Search films...`"
            v-model="query"
            v-on:enter="search()"
          />
          <start-button class="start-button" :title="`Search films...`" @click="search()">
            <search-icon/>
          </start-button>
        </div>
        <div v-if="searchItems" class="search-result" :class="{scroll : scroll}">
          <div v-for="(item, index ) in searchItems" :key="index">
            <item :index="index" :film="item">
              <template v-slot:cover-icon>
                <slot name="cover-icon"></slot>
              </template>
            </item>
          </div>
        </div>
      </div>
      <div class="selected">
        <div class="selected-items">
          <p class="text">Selected items</p>
          <div class="selected-item" v-for="(item, index) in selected" :key="index">
            <film :cover="item.cover" :season="item.season" :desc="item.desc" :name="item.name"></film>
            <delete-icon class="delete-icon" @click="deleteItem(index)" />
          </div>
        </div>
        <div class="actions">
          <action-button class="action-button" @click="$emit('action', selected)">{{actionName}}</action-button>
          <close-button class="close-button" @click="$emit('close')" >Close</close-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Button from "./Base/Button.vue";
import Input from "./Base/Input.vue";
import SearchIcon from "vue-material-design-icons/Magnify.vue";
import Item from "./Search/Item";
import Film from "./Film";
import DeleteIcon from "vue-material-design-icons/DeleteCircle";

export default {
  props: {
    scroll: { type: Boolean, default: true },
    actionName: { type: String, requires: true }
  },

  components: {
    UrlInput: Input,
    StartButton: Button,
    ActionButton: Button,
    CloseButton: Button,
    SearchIcon,
    DeleteIcon,
    Item,
    Film
  },
  data() {
    return {
      query: ""
    };
  },

  methods: {
    search() {
      this.$socket.emit("searchFilms", this.query);
      this.$store.commit("startLoading");
    },

    deleteItem(index) {
      this.$store.commit('unselect', index);
    }
  },

  computed: {
    searchItems() {
      return this.$store.getters.searchItems;
    },

    selected() {
      return this.$store.getters.selectedItems;
    }
  },

  beforeDestroy() {
    this.$store.commit('resetSearch');
  },
};
</script>

<style>
.search-container {
  background-color: #00000080;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.search {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #232935;
  padding: 15px;
  border-radius: 8px;
  max-height: 450px;
  max-width: 800px;
  height: 100%;
  width: 100%;
  border: 1px solid #2f3747;
}

.search-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #232935;
  max-height: 420px;
  max-width: 400px;
  width: 100%;
  height: 100%;
  padding-right: 15px;
  border-right: 1px solid #455168;
}

.start-button {
  font-size: 0;
  position: absolute;
  right: 2px;
  top: 0px;
  color: #dbdbdb;
  background-color: #2e5e89;
  border: 1px solid #2e5e89;
  margin: 6px;
  border-radius: 8px;
  padding: 5px 10px;
}
.start-button:hover {
  background-color: #2e5e89;
  border: 1px solid #2e5e89;
  transform: scale(1.05);
}

.search-input {
  width: 100%;
  font-size: 20px;
  border-radius: 8px;
  max-height: 18px;
  text-align: center;
  background-color: rgba(72, 81, 99, 0.3);
  border: 1px solid transparent;
  max-height: 29px;
}

.search-input:focus {
  border-color: #696969;
  transition: 0.3s;
  background-color: rgba(72, 81, 99, 0.75);
}

.search-form {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  align-content: center;
  width: 100%;
  max-width: 650px;
  position: relative;
}

.search-result {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  max-height: 335px;
  overflow: auto;
  margin-top: 20px;
}

.search .selected {
  width: 100%;
  height: 100%;
}

.selected .actions {
  justify-content: flex-end;
  display: flex;
}

.selected-items {
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: auto;
  width: 100%;
  height: 100%;
  max-height: 400px;
}

.selected-items .text {
  margin: 0;
  font-size: 20px;
}

.selected-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: cacl(100% - 20px);
  margin: 10px;
}

.selected-item .delete-icon {
  color: #ff3e3e;
}

.actions button {
  padding: 5px 10px;
}

.actions .close-button {
  background-color: #ff3e3e;
  border-color: transparent;
}

@media (max-width: 500px) {
  .search-input {
    text-align: left;
    padding-left: 20px;
  }
}
</style>

