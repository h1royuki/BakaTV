const SocketIOService = require('../../services/SocketIOService')
const PlaylistService = require('../../services/PlaylistService');

module.exports = (id, socket) => {
    try {

        PlaylistService.setFilm(id, socket.room);

        const currentFilm = PlaylistService.getCurrentFilmInfo(socket.room);
        const playlist = PlaylistService.getPlaylist(socket.room);

        socket.emit('updatePlaylist', playlist);
        SocketIOService.emitId(socket.room, 'updateFilm', currentFilm);
    } catch (err) {
        socket.emit('err', err.message);
    }
}