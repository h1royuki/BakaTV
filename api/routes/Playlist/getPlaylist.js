const PlaylistService = require('../../services/PlaylistService');

module.exports = async (socket) => {
    try {
        const playlist = await PlaylistService.getPlaylist(socket.room);
        
        socket.emit('updatePlaylist', playlist);
    } catch (err) {
        
        socket.emit('err', 'Error get playlist: ' + err.message)
    }
}