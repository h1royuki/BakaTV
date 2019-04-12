const PlaylistService = require('../../services/PlaylistService');
const SocketIOService = require('../../services/SocketIOService');
module.exports = (socket) => {
    try {

        PlaylistService.startNextFilm(socket.room);

        const currentFilm = PlaylistService.getCurrentFilmInfo(socket.room);
        const playlist = PlaylistService.getPlaylist(socket.room);

        socket.emit('getPlaylist', playlist);
        SocketIOService.emitId(socket.room, 'setCurrentFilm', currentFilm);

    } catch (err) {
        socket.emit('err', err.message);
    }
}