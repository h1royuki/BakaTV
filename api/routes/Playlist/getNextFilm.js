const PlaylistService = require('../../services/PlaylistService');
const SocketIOService = require('../../services/SocketIOService');
module.exports = async (socket) => {
    try {
        const newFilm = await PlaylistService.startNextFilm(socket.room);
        const playlist = await PlaylistService.getPlaylist(socket.room);

        socket.emit('updatePlaylist', playlist);
        SocketIOService.emitId(socket.room, 'updateFilm', newFilm);

    } catch (err) {
        
        socket.emit('err', 'Error get next film: ' + err.message);
    }
}