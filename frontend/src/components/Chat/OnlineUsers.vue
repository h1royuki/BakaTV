<template>
  <div class="online-users">
    <div class="count-container">
      <p class="online-counter">{{onlineUsersCount}} online user{{onlineUsersCount > 1 ? `s` : ``}}</p>
      <show-button class="show-button" @click="showUsers">
        <arrow-up-icon v-if="isShowUsers" :size="32"/>
        <arrow-down-icon :size="32" v-else/>
      </show-button>
    </div>
    <transition name="fade">
      <div v-on-clickaway="hideUsers" class="users-list" v-if="isShowUsers">
        <div v-for="(user, index) in onlineUsers" :key="index">
          <div class="list-name" :style="{color : user.color}">
            <owner-icon class="owner-icon" v-if="user.owner" title="Room owner" :size="22"/>
            <creator-icon class="creator-icon" v-if="user.creator" title="Room creator" :size="22"/>
            {{ index == id ? `${user.name} (you)` : user.name }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { directive as onClickaway } from "vue-clickaway";
import Button from "../Base/Button";
import ArrowDownIcon from "vue-material-design-icons/ChevronDown";
import ArrowUpIcon from "vue-material-design-icons/ChevronUp";
import OwnerIcon from "vue-material-design-icons/AccountEdit";
import CreatorIcon from "vue-material-design-icons/AccountKey";

import "./OnlineUsers.css";

export default {
  components: {
    ShowButton: Button,
    ArrowDownIcon,
    ArrowUpIcon,
    OwnerIcon,
    CreatorIcon
  },

  data() {
    return {
      isShowUsers: false
    };
  },

  methods: {
    hideUsers() {
      this.isShowUsers = false;
    },

    showUsers() {
      this.isShowUsers = true;
    }
  },
  computed: {
    onlineUsers() {
      return this.$store.getters.onlineUsers;
    },
    onlineUsersCount() {
      return this.$store.getters.onlineUsersCount;
    },
    
    id() {
      return this.$store.getters.userId;
    }
  },
  directives: {
    onClickaway
  }
};
</script>
