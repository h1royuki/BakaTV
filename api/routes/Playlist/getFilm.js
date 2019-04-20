const PlaylistService = require('../../services/PlaylistService');

module.exports = async (socket) => {
    try {
        const film = await PlaylistService.getCurrentFilm(socket.room);

        socket.emit('updateFilm', film);
    } catch (err) {        
        socket.emit('err', 'Error get film: ' + err.message);
    }
}