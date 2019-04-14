const PlaylistService = require('../../services/PlaylistService');
const SocketIOService = require('../../services/SocketIOService')

module.exports = (id, socket) => {
    try {

        if (PlaylistService.isCurrentFilm(socket.room, id)) {

            const filmId = PlaylistService.getNextOrPrevFilmId(id, socket.room);

            if (filmId >= 0) {
                PlaylistService.removeFromPlaylist(socket.room, id);
                PlaylistService.setFilm(filmId, socket.room);
                const currentFilm = PlaylistService.getCurrentFilmInfo(socket.room);

                SocketIOService.emitId(socket.room, 'updateFilm', currentFilm);
            } else {
                throw new Error('Last film on playlist. Maybe destroy room?')
            }
        } else {
            PlaylistService.removeFromPlaylist(socket.room, id);
        }

        const playlist = PlaylistService.getPlaylist(socket.room)
        socket.emit('updatePlaylist', playlist);

    } catch (err) {
        socket.emit('err', err.message);
    }
}