const PlaylistService = require('../../services/PlaylistService');

module.exports = (id, socket) => {
    try {
        PlaylistService.removeFromPlaylist(socket.room, id);

        const playlist = PlaylistService.getPlaylist(socket.room)
        socket.emit('getPlaylist', playlist);

    } catch (err) {
        socket.emit('err', err.message);
    }
}