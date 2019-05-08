const PlaylistService = require("../../services/PlaylistService");
const SocketIOService = require("../../services/SocketIOService");

module.exports = async (id, socket) => {
  try {
    if (await PlaylistService.isCurrentItem(socket.room, id)) {
      const nextItem = await PlaylistService.getNextOrPrevItemFromPlaylist(
        socket.room
      );
      if (nextItem) {
        await PlaylistService.removeItemFromPlaylist(socket.room, id);
        SocketIOService.emitId(socket.room, "updateFilm", nextItem);
      } else {
        throw new Error("Last element on playlist. Maybe destroy room?");
      }
    } else {
      await PlaylistService.removeItemFromPlaylist(socket.room, id);
    }

    const playlist = await PlaylistService.getPlaylist(socket.room);
    socket.emit("updatePlaylist", playlist);
  } catch (err) {
    socket.emit("err", "Error remove from playlist" + err.message);
  }
};
