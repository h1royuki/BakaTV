const PlaylistService = require('../../services/PlaylistService')

module.exports = (film, socket) => {
    PlaylistService.addToPlaylist(socket.room, film).then(() => {
        const playlist = PlaylistService.getPlaylist(socket.room)

        socket.emit('notify', "Film added to playlist")
        socket.emit('updatePlaylist', playlist);
    }).catch((err) => {
        socket.emit('err', err.message);
    })
}