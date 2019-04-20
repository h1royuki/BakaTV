const PlaylistService = require('../../services/PlaylistService')

module.exports = async (film, socket) => {
    try {
        await PlaylistService.addToPlaylist(socket.room, film);
        
        const playlist = await PlaylistService.getPlaylist(socket.room)

        socket.emit('notify', "Film added to playlist")
        socket.emit('updatePlaylist', playlist);

    } catch(err) {
        
        socket.emit('err', `Error adding to playlist: ${err.message}`);
    }
}