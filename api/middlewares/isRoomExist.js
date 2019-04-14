const RoomService = require('../services/RoomService');

const routes = ['joinChat', 'messageChat', 'getFilm'];

module.exports = (socket, packet, next) => {
    try {
        if (packet[0] == 'joinRoom') {
            RoomService.getRoom(packet[1]);
        }
        
        if (routes.includes(packet[0])) {
            RoomService.getRoom(socket.room);
        }
        next();
    } catch (err) {
        socket.emit('notFound');
        socket.emit('err', err.message);
    }
}