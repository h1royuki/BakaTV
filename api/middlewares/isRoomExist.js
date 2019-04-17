const RoomService = require('../services/RoomService');

const routes = ['joinChat', 'messageChat', 'getFilm'];

module.exports = async (socket, packet, next) => {
    try {
        if (packet[0] == 'joinRoom') {
            await RoomService.getRoom(packet[1]);
        }
        
        if (routes.includes(packet[0])) {
            await RoomService.getRoom(socket.room);
        }

        next();
    } catch (err) {
        console.log(err);
        socket.emit('notFound');
        socket.emit('err', err.message);
    }
}