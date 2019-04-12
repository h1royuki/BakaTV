const SocketIOService = require('../../services/SocketIOService')
const PlaylistService = require('../../services/PlaylistService');

module.exports = (id, socket) => {
    try {

        PlaylistService.setCurrentFilm(id, socket.room);

        const currentFilm = PlaylistService.getCurrentFilmInfo(socket.room);
        const playlist = PlaylistService.getPlaylist(socket.room);

        socket.emit('getPlaylist', playlist);
        SocketIOService.emitId(socket.room, 'setCurrentFilm', currentFilm);
    } catch (err) {
        socket.emit('err', err.message);
    }
}