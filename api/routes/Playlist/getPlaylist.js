const PlaylistService = require('../../services/PlaylistService');

module.exports = (socket) => {
    try {
        const playlist = PlaylistService.getPlaylist(socket.room);
        console.log(playlist);

        socket.emit('getPlaylist', playlist);
    } catch (err) {
        socket.emit('err', err.message)
    }
}