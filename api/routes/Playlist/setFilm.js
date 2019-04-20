const SocketIOService = require('../../services/SocketIOService')
const PlaylistService = require('../../services/PlaylistService');

module.exports = async (id, socket) => {
    try {

        await PlaylistService.setFilm(socket.room, id);

        const currentFilm = await PlaylistService.getCurrentFilm(socket.room);
        const playlist = await PlaylistService.getPlaylist(socket.room);

        socket.emit('updatePlaylist', playlist);
        SocketIOService.emitId(socket.room, 'updateFilm', currentFilm);
    } catch (err) {
        socket.emit('err', 'Error set film: ' + err.message);
    }
}