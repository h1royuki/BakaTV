const PlaylistService = require('../../services/PlaylistService')

module.exports = (film, socket) => {
    PlaylistService.addToPlaylist(socket.room, film).then(() => {
        const playlist = PlaylistService.getPlaylist(socket.room)
        socket.emit('getPlaylist', playlist);
    }).catch((err) => {
        socket.emit('err', err.message);
    })
}