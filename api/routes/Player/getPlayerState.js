const PlayerService = require('../../services/PlayerService');

module.exports = (socket) => {
    try {
        const state = PlayerService.getPlayerInfo(socket.room);

        socket.emit('getPlayerState', state);
    } catch (err) {
        socket.emit('err', err.message);
    }
}