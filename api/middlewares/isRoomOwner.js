const RoomService = require('../services/RoomService');

const routes = ['addToPlaylist', 'getNextFilm', 'getPlaylist', 'removeFromPlaylist', 'setFilm', 'updateFilmStatus', 'updateFilmTime'];

module.exports = async (socket, packet, next) => {
    try {
        if (routes.includes(packet[0])) {
            if (await !RoomService.isRoomOwner(socket.userId, socket.room)) {
                throw new Error('You not room owner, b-baka');
            }
        }
        next();
    } catch (err) {
        console.log(err);
        socket.emit('err', err.message);
    }
}