const PlaylistService = require('../../services/PlaylistService');

module.exports = (socket) => {
    try {
        const playlist = PlaylistService.getPlaylist(socket.room);
        
        socket.emit('updatePlaylist', playlist);
    } catch (err) {
        socket.emit('err', err.message)
    }
}