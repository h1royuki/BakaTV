const PlaylistService = require('../../services/PlaylistService');

module.exports = (time, socket) => {
    try {
        PlaylistService.updateCurrentTime(socket.room, time);

            socket.broadcast.to(socket.room).emit('getFilmTime', time);
    } catch (err) {
        socket.emit('err', err.message);
    }
}