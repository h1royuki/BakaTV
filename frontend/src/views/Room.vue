<template>
  <div class="room">
    <div class="container room">
      <div class="stream">
        <transition name="fade">
          <video-player v-if="room.status == 'work'" class="player" :options="player"></video-player>
          <div class="status" v-if="room.status == 'start'">
            <p>Stream init</p>
          </div>
          <div class="status" v-if="room.status == 'pause'">
            <p>Stream paused</p>
          </div>
          <div class="status" v-if="room.status == 'stop'">
            <p>Stream stopped</p>
          </div>
        </transition>
      </div>
      <chat class="chat"></chat>
    </div>
  </div>
</template>
<script>
import Chat from "../components/Chat";

export default {
  components: {
    Chat
  },

  computed: {
    room() {
      return this.$store.getters.room;
    },

    player() {
      return this.$store.getters.player;
    }
  },

  mounted() {
    this.$socket.emit("roomJoin", this.$route.params.id);
  }
};
</script>

<style>
.container.room {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
  height: 100%;
  position: absolute;
}

.stream {
  background-color: black;
  width: 100%;
  max-width: calc(100% - 350px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.player {
  width: 100%;
  height: 100%;
}

.video-js {
  width: 100%;
  height: 100%;
}

.status {
  color: white;
  font-weight: 700;
  font-size: 40px;
  text-align: center;
}

.chat {
  width: 350px;
}

@media (max-width: 800px) {
  .stream {
    min-width: 100%;
    height: 35%;
  }
  .chat {
    width: 100%;
    height: 65%;
  }
}
</style>


