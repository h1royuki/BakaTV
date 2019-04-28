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

<style>
.user-badge .badge {
  position: relative;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(72, 81, 99, 0.3);
  font-size: 18px;
  border-radius: 50px;
  cursor: pointer;
}

.badge .user {
  padding-top: 6px;
  padding-right: 10px;
}

.badge .arrow {
  padding-top: 7px;
  padding-left: 5px;
}

.user-badge .dropdown {
  position: absolute;
  top: 65px;
  background-color: #2e323d;
  width: calc(100% - 45px);
  border-radius: 15px;
  padding: 0 20px;
  z-index: 2;
}

.dropdown .category {
  font-size: 15px;
  text-transform: uppercase;
  color: #666e83;
}

.room-link {
  cursor: pointer;
  font-weight: 500;
  color: #cecece;
}
</style>


