const PlaylistService = require('../../services/PlaylistService');

module.exports = async (status, socket) => {
    try {
        await PlaylistService.updateCurrentStatus(socket.room, status);
        
        socket.broadcast.to(socket.room).emit('updateFilmStatus', status);
    } catch (err) {
        
        socket.emit('err', 'Error update status');
    }
}