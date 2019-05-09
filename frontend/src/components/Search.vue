<template>
  <transition name="fade">
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
            <div v-if="selectedLength > 0">
              <div class="selected-item" v-for="(item, index) in selected" :key="index">
                <film :cover="item.cover" :season="item.season" :desc="item.desc" :name="item.name"></film>
                <delete-icon class="delete-icon" @click="deleteItem(index)"/>
              </div>
            </div>
            <div v-else class="selected-empty"><empty-icon :size="70" /><p>Choose anything</p></div>
          </div>
          <div class="actions">
            <action-button class="action-button" @click="$emit('action', selected)">{{actionName}}</action-button>
            <close-button class="close-button" @click="closeSearch">Close</close-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import Button from "./Base/Button.vue";
import Input from "./Base/Input.vue";
import SearchIcon from "vue-material-design-icons/Magnify.vue";
import Item from "./Search/Item";
import Film from "./Film";
import DeleteIcon from "vue-material-design-icons/DeleteCircle";
import EmptyIcon from "vue-material-design-icons/FormatListCheckbox";

import "./Search.css";

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
    EmptyIcon,
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
      this.$store.commit("unselect", index);
    },

    closeSearch() {
      this.$store.commit("resetSearch");
      this.$emit("close");
    }
  },

  computed: {
    searchItems() {
      return this.$store.getters.searchItems;
    },

    selected() {
      return this.$store.getters.selectedItems;
    },

    selectedLength() {
      return this.$store.getters.selectedItemsLength;
    }
  },

  beforeDestroy() {
    this.$store.commit("resetSearch");
  }
};
</script>
