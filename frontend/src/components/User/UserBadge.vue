<template>
  <div class="user-badge">
    <div class="badge" @click="showRooms">
      <account-icon class="user" :size="26"/>
      {{userName}}
      <arrow-down-icon class="arrow" :size="30"/>
    </div>
    <transition name="fade">
      <div class="dropdown" v-on-clickaway="hideRooms" v-if="isShowRooms">
        <p class="category">Created rooms</p>
        <div v-for="(room, index) in userRooms" :key="index">
          <p class="room-link" @click="pushToRoom(room)">{{'/room/' + room}}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import AccountIcon from "vue-material-design-icons/AccountCircleOutline.vue";
import ArrowDownIcon from "vue-material-design-icons/ChevronDown";
import { directive as onClickaway } from "vue-clickaway";

import "./UserBadge.css";

export default {
  components: {
    AccountIcon,
    ArrowDownIcon
  },

  data() {
    return {
      isShowRooms: false
    };
  },

  methods: {
    showRooms() {
      this.isShowRooms = true;
    },

    hideRooms() {
      this.isShowRooms = false;
    },

    pushToRoom(room) {
      this.$router.push(`/room/` + room);
    }
  },

  created() {
    this.$socket.emit("getUserRooms");
  },

  computed: {
    userName() {
      return this.$store.getters.userName;
    },

    userRooms() {
      return this.$store.getters.userRooms;
    }
  },
  directives: {
    onClickaway
  }
};
</script>