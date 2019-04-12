const PlaylistService = require('../../services/PlaylistService');

module.exports = (socket) => {
    try {
        const state = PlaylistService.getCurrentFilmInfo(socket.room);
        socket.emit('getFilmInfo', state);
    } catch (err) {
        socket.emit('err', err.message);
    }
}