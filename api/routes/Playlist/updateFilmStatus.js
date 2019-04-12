const PlaylistService = require('../../services/PlaylistService');

module.exports = (status, socket) => {
    try {
        PlaylistService.updateCurrentStatus(socket.room, status);
        
        
        socket.broadcast.to(socket.room).emit('getFilmStatus', status);
    } catch (err) {
        socket.emit('err', err.message);
    }
}