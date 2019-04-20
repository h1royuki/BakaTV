const PlaylistService = require('../../services/PlaylistService');

module.exports = async (time, socket) => {
    try {
        await PlaylistService.updateCurrentTime(socket.room, time);
        socket.broadcast.to(socket.room).emit('updateFilmTime', time);
    } catch (err) {
        
        socket.emit('err', 'Error update time');
    }
}