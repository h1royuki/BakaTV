const PlaylistService = require('../../services/PlaylistService');

module.exports = async (id, socket) => {
    try {

        await PlaylistService.removeFromPlaylist(socket.room, id);
        const playlist = await PlaylistService.getPlaylist(socket.room);

        socket.emit('updatePlaylist', playlist);

    } catch (err) {
        console.log(err);
        socket.emit('err', err.message);
    }
}