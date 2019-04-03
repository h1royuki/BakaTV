<template>
  <div class="online-users">
    <div class="count-container">
      <p class="online-counter">{{onlineUsersCount}} online user{{onlineUsersCount > 1 ? `s` : ``}}</p>
      <show-button class="show-button" v-on:send="showUsers">
        <arrow-up-icon v-if="isShowUsers" :size="32"/>
        <arrow-down-icon :size="32" v-else/>
      </show-button>
    </div>
    <transition name="fade">
      <div v-on-clickaway="hideUsers" class="users-list" v-if="isShowUsers">
        <div v-for="(user, index) in onlineUsers" :key="index">
          <div class="list-name" :style="{color : user.color}">
            <star-icon class="star-icon" v-if="user.id == ownerId" title="Room owner" size="22"/>
            {{ user.id == id ? `${user.name} (you)` : user.name }}
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
import StarIcon from "vue-material-design-icons/Star";

export default {
  components: {
    ShowButton: Button,
    ArrowDownIcon,
    ArrowUpIcon,
    StarIcon
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
    },
    ownerId() {
      return this.$store.getters.ownerId;
    }
  },
  directives: {
    onClickaway
  }
};
</script>

<style>
.count-container {
  padding: 5px;
  height: 40px;
  color: #e1e1e1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1c222d;
  border-bottom: 1px solid #171a21;
}

.online-counter {
  font-size: 18px;
}

.show-button {
  background: transparent;
  border: none;
  padding-top: 8px;
  margin: 0;
  float: right;
  position: absolute;
  right: 10px;
}

.show-button:hover {
  background: transparent;
  border: none;
}

.users-list {
  position: absolute;
  top: 51px;
  padding: 10px;
  background-color: #1c222d;
  max-height: 400px;
  width: calc(100% - 20px);
  box-shadow: 0px 9px 15px 1px #15192080;
  overflow-y: auto;
  border-bottom: 1px solid #171a21;
}

.list-name {
  padding: 5px 0;
}

.star-icon {
  margin-right: 8px;
  font-size: 0;
  vertical-align: top;
  color: #ffd646;
}
</style>


