const RoomService = require('../services/RoomService');

const routes = ['destroyRoom', 'updateFilmTime', 'updateFilmStatus'];

module.exports = (socket, packet, next) => {
    try {
        if (routes.includes(packet[0])) {
            if (!RoomService.isRoomOwner(socket.id, socket.room)) {
                throw new Error('You not room owner, b-baka');
            }
        }
        next();
    } catch (err) {
        socket.emit('err', err.message);
    }
}